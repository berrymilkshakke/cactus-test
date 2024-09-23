import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';
import {Helper} from '../../_core/classes/helper';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-player-money-bonus-item',
  templateUrl: './player-money-bonus-item.component.html',
  styleUrls: ['./player-money-bonus-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerMoneyBonusItemComponent implements OnInit {

  @Input() public bonus: any;

  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;
  @Input() public showButtons: boolean = true;

  public cdnServer: any;
  public str: string = '';

  constructor(public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public showModalService: ShowModalService) {
  }

  ngOnInit() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/bonuses/default_bonus.webp`;
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/promo/${imageName}`;
  }

  getGameImagePatch(gameId: any) {

    const game = this.gamesService.getGameById(Helper.stringToJSON(gameId));

    if (!game) {
      return null;
    }

    const path = this.gamesService.getImagePatch(game.brand_name, game.image);

    return path;
  }

  cancelPlayerMoneyBonus(bonusId: any) {
    return this.playerMoneyBonusesService.cancelPlayerMoneyBonus(bonusId);
  }

  activatePlayerMoneyBonus(bonusId: any) {
    return this.playerMoneyBonusesService.activatePlayerMoneyBonus(bonusId);
  }

  openModalPlayerMoneyBonus(bonus: any, showButtons: boolean) {
    this.showModalService.openModalPlayerMoneyBonus(bonus, showButtons);
  }
}
