import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {GamesService} from '../../_core/services/games.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrls: ['./games-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesMenuComponent implements OnInit {

  @Input() public pageName: string;
  @Input() public showSearch: boolean = false;
  @Input() public showProvidersFilter: boolean = false;

  public searchString: any = '';

  public categories: any;

  public isShowAllowedGamesModel: boolean = true;

  constructor(private showModalService: ShowModalService,
              public gamesService: GamesService,
              public deviceDetectorService: DeviceDetectorService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public authGuard: AuthGuard) {
  }

  ngOnInit() {

    this.isShowAllowedGamesModel = this.gamesService.isShowAllowedGames;

    this.categories = this.gamesService.categoriesArray;
    this.gamesService.gameCategoriesReceivedEvent.subscribe(() => {
      this.categories = this.gamesService.categoriesArray;
    });

    this.searchString = this.gamesService.searchString;
    this.gamesService.searchStringChangedEvent.subscribe(() => {
      this.searchString = this.gamesService.searchString;
    });
  }

  openSearchModal() {
    this.showModalService.openModalSearch(['games']);
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  openLoginModal() {
    this.showModalService.openModalLogin();
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }

  switchShowAllowedGames() {
    this.isShowAllowedGamesModel = !!this.isShowAllowedGamesModel;

    this.gamesService.isShowAllowedGames = this.isShowAllowedGamesModel;
  }

  isActiveBonus() {
    return this.playerMoneyBonusesService.activeBonus;
  }

  isShowAllowedGames() {
    if (!this.playerMoneyBonusesService.activeBonus) {
      return false;
    }

    return this.gamesService.isShowAllowedGames;
  }
}
