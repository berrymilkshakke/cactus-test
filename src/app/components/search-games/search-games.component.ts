import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchGamesComponent implements OnInit {

  public searchString: any;

  public brands: any;
  public selectedBrands: any = [];

  public selectorOpened: boolean = false;
  public backdrop: any;

  public isShowAllowedGames: boolean = true;

  constructor(public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              private showModalService: ShowModalService) {
  }

  ngOnInit() {
     this.isShowAllowedGames = this.gamesService.isShowAllowedGames;

    this.brands = this.gamesService.brandsArray;
    this.gamesService.gameBrandsReceivedEvent.subscribe(() => {
      this.brands = this.gamesService.brandsArray;
    });

    this.selectedBrands = this.gamesService.selectedBrandsArray;
    this.gamesService.selectedBrandsChangedEvent.subscribe(() => {
      this.selectedBrands = this.gamesService.selectedBrandsArray;
    });
  }

  onChangeSearchString(searchString: any) {
    this.gamesService.searchString = searchString;
    this.gamesService.searchStringChangedEvent.emit();
  }

  clearSearchString() {
    this.searchString = '';
    this.gamesService.searchString = '';
    this.gamesService.searchStringChangedEvent.emit();
  }

  openSearchModal() {
    this.showModalService.openModalSearch(['providers']);
  }

  switchShowAllowedGames() {
    this.isShowAllowedGames = !!this.isShowAllowedGames;

    this.gamesService.isShowAllowedGames = this.isShowAllowedGames;
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  isActiveBonus() {
    return this.playerMoneyBonusesService.activeBonus;
  }
}
