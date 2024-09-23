import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {DomainsConfig} from '../../_configs/domains.conf';
import {GamesService} from '../../_core/services/games.service';
import {Helper} from '../../_core/classes/helper';


@Component({
  selector: 'app-player-money-bonus-history-item',
  templateUrl: './player-money-bonus-history-item.component.html',
  styleUrls: ['./player-money-bonus-history-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerMoneyBonusHistoryItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public showButtons = false;

  public cdnServer: any;
  public str: string = '';
  playedTitle: string;

  constructor(public gamesService: GamesService,
              public auth: AuthGuard,
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

  cancelPlayerMoneyBonus(id: number) {

  }

  activatePlayerMoneyBonus(id: number) {

  }

  statusString(status: number | string) {
    return '';
  }

  openModalPlayerMoneyBonus(bonus: any, showButtons: boolean) {
    this.showModalService.openModalPlayerMoneyBonus(bonus, showButtons);
  }
}
