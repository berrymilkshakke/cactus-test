import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {SystemConfig} from '../../_configs/system.conf';
import {PlatformDetectorService} from './platform-detector.service';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {AuthenticationService} from './authentication.service';
import {GamesPublicDataSource} from '../datasources/games-public.datasource';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  public games = [];                 // array of objects (id: game) (from server)

  public gamesArray = [];            // array of games (used in search)
  public gamesArrayFiltered = [];    // array of games (filtered)

  public brands = [];
  public brandsArray = [];
  public brandsArrayFiltered = [];
  public selectedBrandsArray = [];

  public categories = [];
  public categoriesArray = [];

  public isGameCategoriesReceived = false;
  public isGameBrandsReceived = false;
  public isGamesReceived = false;
  public isAllLoaded = false;

  public cdnServer: any;
  public cdnAssetsSize: any;

  public searchString = '';

  public isShowAllowedGames = true;

  @Output() public gameCategoriesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gameBrandsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public gamesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gamesUpdatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gamesFilteredEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public allLoadedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public searchStringChangedEvent: EventEmitter<string> = new EventEmitter();
  @Output() public searchOpenedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public gameBrandsFilteredEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public selectedBrandsChangedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public platformDetectorService: PlatformDetectorService,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public gamesPublicDataSource: GamesPublicDataSource,
              public authenticationService: AuthenticationService) {

    webSocketService.connectedEvent.subscribe(() => {
      this.subscribeToEventGamesUpdated();
      this.subscribeToEventGameBrandsUpdated();
      this.subscribeToEventGameCategoriesUpdated();
    });

    this.getGames();
    this.getGameBrands();
    this.getGameCategories();

    this.gamesReceivedEvent.subscribe(() => {
      this.checkAllLoaded();
    });

    this.gameBrandsReceivedEvent.subscribe(() => {
      this.checkAllLoaded();
    });

    this.gameCategoriesReceivedEvent.subscribe(() => {
      this.checkAllLoaded();
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.unsetAllowedFlag();
    });

    this.cdnServer = DomainsConfig.cdnServerGames;
    this.cdnAssetsSize = SystemConfig.cdnAssetsSize;
  }

  subscribeToEventGamesUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'games-updated')
      .subscribe(data => {
        this.isGamesReceived = false;
        this.isGameBrandsReceived = false;
        this.isGameCategoriesReceived = false;
        this.getGames();
        this.getGameBrands();
        this.getGameCategories();
      });
  }

  subscribeToEventGameCategoriesUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'game-categories-updated')
      .subscribe(data => {
        this.isGamesReceived = false;
        this.isGameCategoriesReceived = false;
        this.getGames();
        this.getGameCategories();
      });
  }

  subscribeToEventGameBrandsUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'game-brands-updated')
      .subscribe(data => {
        this.isGamesReceived = false;
        this.isGameBrandsReceived = false;
        this.getGames();
        this.getGameBrands();
      });
  }

  getGames() {
    this.gamesPublicDataSource.getGames(this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {

          const gamesArray = data;
          const games = [];

          for (const game of gamesArray) {
            game.allowed = true;
            games[game.id] = game;
          }

          this.games = games;
          this.gamesArray = gamesArray;

          this.isGamesReceived = true;
          this.gamesReceivedEvent.emit();
        });
  }

  getGameBrands() {
    this.gamesPublicDataSource.getBrands(this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {

          const brands = data;
          const brandsArray = [];

          for (const brand in brands) {
            brandsArray.push(brands[brand]);
          }

          this.brands = data;
          this.brandsArray = brandsArray;
          this.brandsArrayFiltered = brandsArray;

          this.isGameBrandsReceived = true;
          this.gameBrandsReceivedEvent.emit();
        });
  }

  getGameCategories() {
    this.gamesPublicDataSource.getCategories(this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {
          const categories = data;
          const categoriesArray = [];

          for (const category in categories) {
            categoriesArray.push(categories[category]);
          }

          this.categories = categories;
          this.categoriesArray = categoriesArray;

          this.isGameCategoriesReceived = true;
          this.gameCategoriesReceivedEvent.emit();
        });
  }

  checkAllLoaded() {
    if (
      this.isGamesReceived &&
      this.isGameBrandsReceived &&
      this.isGameCategoriesReceived
    ) {
      this.isAllLoaded = true;
      this.allLoadedEvent.emit();
    }
  }

  getGamesFiltered(categoryName: string) {
    const games = this.games;
    const categories = this.categories;

    if (!games || !categories || categories.length === 0) {
      this.gamesArrayFiltered = [];
      this.gamesFilteredEvent.emit();
      return [];
    }

    if (!categoryName) {
      categoryName = 'all'; 
    }

    if (!categories[categoryName]) {
      return [];
    }

    let gamesArrayFiltered = [];
    const gamesIds = categories[categoryName].games;

    if (gamesIds) {
      for (const gameId of gamesIds) {
        if (games[gameId] !== undefined) {
          gamesArrayFiltered.push(games[gameId]);
        }
      }
    }

    return gamesArrayFiltered;
  }

  setFilter(categoryName: string, brandName: string) {

    if (!this.isGamesReceived || !this.isGameBrandsReceived || !this.isGameCategoriesReceived) {
      return;
    }

    const games = this.games;
    const categories = this.categories;
    const selectedBrandsArray = this.selectedBrandsArray;

    if (!games || !categories || categories.length === 0) {
      this.gamesArrayFiltered = [];
      this.gamesFilteredEvent.emit();
      return;
    }

    if (!categoryName) {
      categoryName = 'all';
    }

    if (!categories[categoryName]) {
      return;
    }

    let gamesArrayFiltered = [];
    const gamesIds = categories[categoryName].games;

    if (gamesIds) {
      for (const gameId of gamesIds) {
        if (games[gameId] !== undefined) {
          gamesArrayFiltered.push(games[gameId]);
        }
      }
    }

    if (!brandName && selectedBrandsArray.length === 0) {

      let brandsFiltered = [];
      for (const game of gamesArrayFiltered) {
        if (this.brands[game.brand_name]) {
          const sortIndex = this.brands[game.brand_name]['sort_index'];
          if (!(sortIndex in brandsFiltered)) {
            brandsFiltered[sortIndex] = this.brands[game.brand_name];
          }
        }
      }

      let brandsArrayFiltered = [];
      for (const index in brandsFiltered) {
        brandsArrayFiltered.push(brandsFiltered[index]);
      }

      this.brandsArrayFiltered = brandsArrayFiltered;
      this.gameBrandsFilteredEvent.emit();
    }

    if (brandName) {
      gamesArrayFiltered = gamesArrayFiltered.filter(game => game.brand_name === brandName);
    }

    if (selectedBrandsArray.length > 0) {
      gamesArrayFiltered = gamesArrayFiltered.filter(function(game) {
        return selectedBrandsArray.indexOf(game.brand_name) !== -1;
      });
    }

    this.gamesArrayFiltered = gamesArrayFiltered;
    this.gamesFilteredEvent.emit();
  }

  changeSelectedBrands(brandName: string) {

    const selectedBrandsArray = this.selectedBrandsArray;

    const index = selectedBrandsArray.indexOf(brandName);
    if (index === -1) {
      selectedBrandsArray.push(brandName);
    } else {
      selectedBrandsArray.splice(index, 1);
    }

    this.selectedBrandsChangedEvent.emit();
  }

  clearSelectedBrands() {
    this.selectedBrandsArray = [];
    this.selectedBrandsChangedEvent.emit();
  }

  getImagePatch(brandName: string, imageName: string) {
    return `${this.cdnServer}/${this.cdnAssetsSize}/${brandName}/${imageName}`;
  }

  getBlankImagePatch() {
    return `assets/img/games/no_game.png`;
  }

  getGameById(id: any) {
    if (!(id in this.games)) {
      return null;
    }

    return this.games[id];
  }

  getGameByName(brandName: string, gameName: string) {
    return this.gamesArray.find(game => ((game.brand_name === brandName) && (game.name === gameName)));
  }

  getBrandByName(name: any) {
    if (!(name in this.brands)) {
      return null;
    }

    return this.brands[name];
  }

  unsetAllowedFlag() {

    const games = this.games;

    for (const id in games) {
      games[id].allowed = true;
    }

    this.games = games;
  }

  setAllowedFlag(providersAllowed: any, gamesAllowed: any, gamesDisallowed: any) {

    const games = this.games;

    if (providersAllowed !== null) {
      for (const id in games) {
        if (providersAllowed.includes(games[id].provider_id.toString())) {
          games[id].allowed = true;
        } else {
          games[id].allowed = false;
        }
      }
    }

    if (gamesAllowed !== null) {
      for (const id in games) {
        if (gamesAllowed.includes(id) && (games[id].allowed !== false)) {
          games[id].allowed = true;
        } else {
          games[id].allowed = false;
        }
      }
    }

    if (gamesDisallowed !== null) {
      for (const id in games) {
        if (gamesDisallowed.includes(Number(id))) {
          games[id].allowed = false;
        } else {
          games[id].allowed = true;
        }
      }
    }

    this.games = games;
  }

  setLikedFlag(gameId: number, flagValue: boolean) {

    if (!this.games) {
      return;
    }

    if (!this.games.hasOwnProperty(gameId)) {
      return;
    }

    this.games[gameId].liked = flagValue;

    this.gamesUpdatedEvent.emit();
  }
}
