import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';


@Component({
  selector: 'app-selected-providers',
  templateUrl: './selected-providers.component.html',
  styleUrls: ['./selected-providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectedProvidersComponent implements OnInit {

  public categoryName: string = 'all';
  public brandName: string;

  public brands: any;
  public selectedBrands: any = [];

  constructor(public gamesService: GamesService) {
  }

  ngOnInit() {

    this.brands = this.gamesService.brands;
    this.gamesService.gameBrandsReceivedEvent.subscribe(() => {
      this.brands = this.gamesService.brands;
    });

    this.selectedBrands = this.gamesService.selectedBrandsArray;
    this.gamesService.selectedBrandsChangedEvent.subscribe(() => {
      this.selectedBrands = this.gamesService.selectedBrandsArray;
    });
  }

  removeBrand(brandName: string) {
    this.gamesService.changeSelectedBrands(brandName);
  }
}
