import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {GamesService} from '../../_core/services/games.service';
import {ListFilterPipe} from '../../_core/pipes/pipes/list-filter.pipe';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {PlayerGamesService} from '../../_core/services/player-games.service';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-games-list-home',
  templateUrl: './games-list-home.component.html',
  styleUrls: ['./games-list-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ListFilterPipe]
})
export class GamesListHomeComponent implements OnInit, OnChanges {

  @Input() public categoryName: string;
  @Input() public brandName: string;
  @Input() public pageName: string;
  @Input() public showMoreButton: boolean = false;
  @Input() public isSimple: boolean = false;
  @Input() public isShowSearchResult: boolean = false; 

  public games: any;
  public gamesArray: any;
  public favoriteGames: any;
  public searchedGames: any = [];

  public limitCount: number = 28;
  public limitCountMobile: number = 8;
  public limitCountInit: number = 28;
  public limitCountMore: number = 4 * 7;

  public searchString: any;

  constructor(public gamesService: GamesService,
              public showModalService: ShowModalService,
              public playerGamesService: PlayerGamesService,
              public listFilterPipe: ListFilterPipe,
              public deviceDetectorService: DeviceDetectorService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public platformDetectorService: PlatformDetectorService) {
  }

  ngOnInit() {

    this.limitCount = this.limitCountInit;

    if (this.isSimple) {
      this.limitCountInit = this.platformDetectorService.platform === 'desktop' ? 40 : 39;
      this.limitCountMore = this.platformDetectorService.platform === 'desktop' ? 8 * 5 : 3 * 11;
    } else {
      this.limitCountInit = 28;
      this.limitCountMore = 4 * 7;
    }

    this.gamesArray = this.gamesService.gamesArray;
    this.gamesService.allLoadedEvent.subscribe(() => {
      if (this.categoryName !== 'favorites') {
        this.gamesService.setFilter(this.categoryName, this.brandName);
      }
      this.gamesArray = this.gamesService.gamesArray;
    });

    this.games = this.gamesService.gamesArrayFiltered;
    this.gamesService.gamesFilteredEvent.subscribe(() => {
      this.games = this.gamesService.gamesArrayFiltered;
      this.limitCount = this.limitCountInit;
    });

    this.favoriteGames = this.playerGamesService.favoriteGames;
    this.playerGamesService.favoriteGamesReceivedEvent.subscribe(() => {
      this.favoriteGames = this.playerGamesService.favoriteGames;
    });

    this.gamesService.searchStringChangedEvent.subscribe(() => {
      this.searchString = this.gamesService.searchString;
      this.searchedGames = this.listFilterPipe.transform(this.gamesArray, this.searchString); // .slice(0, 8);
    });

    this.gamesService.selectedBrandsChangedEvent.subscribe(() => {
      if (this.categoryName !== 'favorites') {
        this.gamesService.setFilter(this.categoryName, this.brandName);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.gamesService.isAllLoaded) {
      if (this.categoryName !== 'favorites') {
        this.gamesService.setFilter(this.categoryName, this.brandName);
      }
    }
  }

  onChangeLimitCount() {
    this.limitCount = this.limitCount + this.limitCountMore;
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  isActiveBonus() {
    return this.playerMoneyBonusesService.activeBonus;
  }

  isShowAllowedGames() {
    return this.gamesService.isShowAllowedGames;
  }
}
