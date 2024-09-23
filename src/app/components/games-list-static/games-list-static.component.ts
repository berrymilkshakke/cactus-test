import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {ListFilterPipe} from '../../_core/pipes/pipes/list-filter.pipe';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {PlayerGamesService} from '../../_core/services/player-games.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-games-list-static',
  templateUrl: './games-list-static.component.html',
  styleUrls: ['./games-list-static.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ListFilterPipe]
})
export class GamesListStaticComponent implements OnInit {

  @Input() public categoryName: string;
  @Input() public brandName: string;
  @Input() public pageName: string;
  @Input() public showMoreButton: boolean = false;
  @Input() public isSimple: boolean = false;

  public games: any;
  public favoriteGames: any;

  public limitCount: number;
  public limitCountInit: number = 40;
  public limitCountMore: number = 8 * 5;

  public searchString: any;

  constructor(public gamesService: GamesService,
              public showModalService: ShowModalService,
              public playerGamesService: PlayerGamesService,
              public deviceDetectorService: DeviceDetectorService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public platformDetectorService: PlatformDetectorService) {
  }

  ngOnInit() {

    this.limitCount = this.limitCountInit;

    this.games = this.gamesService.getGamesFiltered(this.categoryName);
    this.gamesService.allLoadedEvent.subscribe(() => {
      this.games = this.gamesService.getGamesFiltered(this.categoryName);
    });

    this.favoriteGames = this.playerGamesService.favoriteGames;
    this.playerGamesService.favoriteGamesReceivedEvent.subscribe(() => {
      this.favoriteGames = this.playerGamesService.favoriteGames;
    });
  }

  onChangeLimitCount() {
    this.limitCount = this.limitCount + this.limitCountMore;
  }

  getFavoriteGames(brandName: string) {
    return this.favoriteGames;
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
