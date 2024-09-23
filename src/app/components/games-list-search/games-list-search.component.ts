import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {ListFilterPipe} from '../../_core/pipes/pipes/list-filter.pipe';
import {SystemConfig} from '../../_configs/system.conf';
import {DomainsConfig} from '../../_configs/domains.conf';
import {HelperService} from '../../_core/services/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-games-list-search',
  templateUrl: './games-list-search.component.html',
  styleUrls: ['./games-list-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ListFilterPipe]
})
export class GamesListSearchComponent implements OnInit, OnChanges {

  @Input() game: any;
  @Input() categoryName: string;
  @Input() brandName: string;
  @Input() searchString: any = '';

  public games: any;
  public searchedGames: any = [];

  public cdnServer: any;
  public cdnAssetsSize: any;

  public limitCount: number = 12;
  public limitCountMore: number = 12;

  constructor(private platformDetectorService: PlatformDetectorService,
              public gamesService: GamesService,
              private listPipe: ListFilterPipe,
              public helperService: HelperService,
              public deviceDetectorService: DeviceDetectorService,
              public activeModal: NgbActiveModal) {

    this.cdnServer = DomainsConfig.cdnServerGames;
    this.cdnAssetsSize = SystemConfig.cdnAssetsSize;
  }

  ngOnInit() {
    this.games = this.gamesService.gamesArray;
    this.gamesService.allLoadedEvent.subscribe(() => {
      this.games = this.gamesService.gamesArray;
    });

    this.searchedGames = this.listPipe.transform(this.games, this.searchString);

    this.gamesService.searchStringChangedEvent.subscribe(() => {
      this.searchString = this.gamesService.searchString;
      this.searchedGames = this.listPipe.transform(this.games, this.searchString);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.searchedGames = this.listPipe.transform(this.games, this.searchString);
  }

  getImagePatch(brandName: string, imageName: string) {
    return `${this.cdnServer}/${this.cdnAssetsSize}/${brandName}/${imageName}`;
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/games/no_game.png`;
  }

  getUrlWithoutParameters() {
    return this.helperService.getUrlWithoutParameters();
  }

  closeModal() {
    this.activeModal.close();
  }

  onChangeLimitCount() {
    this.limitCount = this.limitCount + this.limitCountMore;
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }
}
