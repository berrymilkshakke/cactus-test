import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {LanguagesService} from '../../_core/services/languages.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-layout-games',
  templateUrl: './layout-games.component.html',
  styleUrls: ['./layout-games.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutGamesComponent implements OnInit {

  @Input() public brandName: string;
  @Input() public categoryName: string;

  public games: any;

  public isSeparateLiveCategory: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,
              public gamesService: GamesService,
              public showModalService: ShowModalService,
              public languagesService: LanguagesService) {
    this.isSeparateLiveCategory = DomainsConfig.isSeparateLiveCategory;
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const categoryName = params['categoryName'];
      const brandName = params['brandName'];

      if (brandName == null) {
        this.gamesService.clearSelectedBrands();
      }

      if (categoryName == null) {
        return;
      }

      this.categoryName = categoryName;
      this.brandName = brandName;

      if (this.categoryName !== 'favorites') {
        this.gamesService.setFilter(this.categoryName, this.brandName);
      }
    });

  }

  getSearchString() {
    return this.gamesService.searchString;
  }
}
