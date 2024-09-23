import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GamesService} from '../../_core/services/games.service';
import {ListFilterPipe} from '../../_core/pipes/pipes/list-filter.pipe';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ListFilterPipe]
})
export class ModalSearchComponent implements OnInit {

  @Input() tab: any;

  public searchStringGames: any;
  public searchStringBrands: any;

  public brands: any = [];
  public searchedBrands: any = [];

  public categoryName: string = 'all';

  public vh: number;

  constructor(public activeModal: NgbActiveModal,
              public listPipe: ListFilterPipe,
              public deviceDetectorService: DeviceDetectorService,
              public gamesService: GamesService) {
  }

  ngOnInit() {
    this.vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);

    this.brands = this.gamesService.brandsArray;
    this.gamesService.gameBrandsReceivedEvent.subscribe(() => {
      this.brands = this.gamesService.brandsArray;
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  onChangeBrand(brandName: string) {
    this.gamesService.clearSelectedBrands();
    this.gamesService.changeSelectedBrands(brandName);
    this.closeModal();
  }

  onChangeSearchBrands(searchStringBrands: any) {
    this.searchedBrands = this.listPipe.transform(this.brands, searchStringBrands);
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }

  onChangeSearchStringGames() {
    this.gamesService.searchString = this.searchStringGames;
    this.gamesService.searchStringChangedEvent.emit();
  }
}
