import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerFsBonusesService} from '../../_core/services/player-fs-bonuses.service';
import {PlayerService} from '../../_core/services/player.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-player-fs-bonus-modal-item',
  templateUrl: './player-fs-bonus-modal-item.component.html',
  styleUrls: ['./player-fs-bonus-modal-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerFsBonusModalItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public showButtons: boolean = true;

  public cdnServer: any;

  constructor(public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerFsBonusesService: PlayerFsBonusesService,
              public playerService: PlayerService,
              public fsBonusesService: FsBonusesService,
              public showModalService: ShowModalService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  closeModal() {
    this.activeModal.close();
  }

  getOptionMoneyBonus(bonus: any, optionName: string) {
    return this.fsBonusesService.getOptionMoneyBonus(bonus, optionName);
  }

  cancelPlayerFsBonus(bonusId: any) {
    this.closeModal();
    return this.playerFsBonusesService.cancelPlayerFsBonus(bonusId);
  }

  activatePlayerFsBonus(bonusId: any) {
    this.closeModal();
    return this.playerFsBonusesService.activatePlayerFsBonus(bonusId);
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }
}
