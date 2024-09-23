import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {GamesListComponent} from '../games-list/games-list.component';


@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchHomeComponent implements OnInit {

  @Input() desktop: boolean = false;
  @Input() showProvidersFilter: boolean = true;

  @ViewChild('gamesList', null) gamesList: GamesListComponent;

  public searchString: any;

  public brands: any;
  public selectedBrands: any = [];

  public selectorOpened: boolean = false;
  public backdrop: any;

  constructor(public gamesService: GamesService) {
  }

  ngOnInit() {
    this.brands = this.gamesService.brandsArray;
    this.gamesService.gameBrandsReceivedEvent.subscribe(() => {
      this.brands = this.gamesService.brandsArray;
    });

    this.selectedBrands = this.gamesService.selectedBrandsArray;
    this.gamesService.selectedBrandsChangedEvent.subscribe(() => {
      this.selectedBrands = this.gamesService.selectedBrandsArray;
    });
  }

  onChangeBrand(brandName: string) {
    this.gamesService.changeSelectedBrands(brandName);
  }

  clearSelectedBrands() {
    this.gamesService.clearSelectedBrands();
  }

  toggleSelector() {
    this.selectorOpened ? this.closeSelector() : this.openSelector();
  }

  openSelector() {
    this.selectorOpened = true;
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop show';
    this.backdrop.addEventListener('click', this.closeSelector.bind(this));
    document.body.appendChild(this.backdrop);
  }

  closeSelector() {
    this.selectorOpened = false;
    document.body.removeChild(this.backdrop);
  }

  onChangeSearchString(searchString: any) {
    this.gamesService.searchString = searchString;
    this.gamesService.searchStringChangedEvent.emit();
  }
}
