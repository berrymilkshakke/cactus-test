import {Component, Input, ViewEncapsulation} from '@angular/core';
import {SystemConfig} from '../../_configs/system.conf';
import {HelperService} from '../../_core/services/helper.service';
import {GamesService} from '../../_core/services/games.service';
import {PlayerGamesService} from '../../_core/services/player-games.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {DomainsConfig} from '../../_configs/domains.conf';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameItemComponent {

  @Input() game: any;
  @Input() isBig: boolean = false;
  @Input() pageName: string;

  public cdnServer: any;
  public cdnAssetsSize: any;
  public cdnBigAssetsSize: any;

  constructor(public authGuard: AuthGuard,
              public helperService: HelperService,
              public gamesService: GamesService,
              public deviceDetectorService: DeviceDetectorService,
              public playerGamesService: PlayerGamesService) {
    this.cdnServer = DomainsConfig.cdnServerGames;
    this.cdnAssetsSize = SystemConfig.cdnAssetsSize;
    this.cdnBigAssetsSize = SystemConfig.cdnBigAssetsSize;
  }

  toggleLike() {
    if (this.game.liked) {
      this.playerGamesService.deleteGameFromFavorites(this.game.id);
    } else {
      this.playerGamesService.addGameToFavorites(this.game.id);
    }
  }

  getImagePatch(brandName: string, imageName: string) {
    return `${this.cdnServer}/${this.cdnAssetsSize}/${brandName}/${imageName}`;
  }

  getBigImagePatch(brandName: string, imageName: string) {
    return `${this.cdnServer}/${this.cdnBigAssetsSize}/${brandName}/${imageName}`;
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/games/no_game.png`;
  }

  errorHandlerBig(event: any) {
    event.target.src = `assets/img/games/no_game_big.png`;
  }

  getUrlWithoutParameters() {
    return this.helperService.getUrlWithoutParameters();
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }
}
