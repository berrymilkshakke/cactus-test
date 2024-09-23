import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {GamesService} from '../../_core/services/games.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-games-list-carousel',
  templateUrl: './games-list-carousel.component.html',
  styleUrls: ['./games-list-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesListCarouselComponent implements OnInit {

  @Input() public brandName: string;
  @Input() public categoryName: string;

  public games: any;

  public limitCount: number;
  public limitCountInit: number = 40;

  public slideConfig: any = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    vertical: false,
    arrows: false,
    dots: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 959,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  constructor(public platformDetectorService: PlatformDetectorService,
              public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public deviceDetectorService: DeviceDetectorService) {
    this.limitCount = this.limitCountInit;
  }

  ngOnInit() {

    this.games = this.gamesService.getGamesFiltered(this.categoryName);
    this.gamesService.allLoadedEvent.subscribe(() => {
      this.games = this.gamesService.getGamesFiltered(this.categoryName);
    });
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
