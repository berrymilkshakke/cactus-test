import {Component, Input, ViewEncapsulation} from '@angular/core';
import {HelperService} from '../../_core/services/helper.service';
import {SystemConfig} from '../../_configs/system.conf';
import {GamesService} from '../../_core/services/games.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-game-item-simple',
  templateUrl: './game-item-simple.component.html',
  styleUrls: ['./game-item-simple.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameItemSimpleComponent {

  @Input() game: any;

  public cdnServer: any;
  public cdnAssetsSize: any;

  constructor(public helperService: HelperService,
              public gamesService: GamesService) {
    this.cdnServer = DomainsConfig.cdnServerGames;
    this.cdnAssetsSize = SystemConfig.cdnAssetsSize;
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
}
