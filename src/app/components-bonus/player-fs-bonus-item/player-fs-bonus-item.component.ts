import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerFsBonusesService} from '../../_core/services/player-fs-bonuses.service';
import {PlayerService} from '../../_core/services/player.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-player-fs-bonus-item',
  templateUrl: './player-fs-bonus-item.component.html',
  styleUrls: ['./player-fs-bonus-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerFsBonusItemComponent implements OnInit {

  @Input() public bonus: any;

  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;
  @Input() public showButtons: boolean = true;

  public cdnServer: any;

  constructor(public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerFsBonusesService: PlayerFsBonusesService,
              public playerService: PlayerService,
              public fsBonusesService: FsBonusesService,
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
    const game = this.gamesService.getGameById(gameId);

    if (!game) {
      return null;
    }

    const path = this.gamesService.getImagePatch(game.brand_name, game.image);

    return path;
  }

  getOptionMoneyBonus(bonus: any, optionName: string) {
    return this.fsBonusesService.getOptionMoneyBonus(bonus, optionName);
  }

  cancelPlayerFsBonus(bonusId: any) {
    return this.playerFsBonusesService.cancelPlayerFsBonus(bonusId);
  }

  activatePlayerFsBonus(bonusId: any) {
    return this.playerFsBonusesService.activatePlayerFsBonus(bonusId);
  }

  openModalPlayerFsBonus(bonus: any, showButtons: boolean) {
    this.showModalService.openModalPlayerFsBonus(bonus, showButtons);
  }
}