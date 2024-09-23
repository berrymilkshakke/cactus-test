import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';
import {Helper} from '../../_core/classes/helper';
import {DomainsConfig} from '../../_configs/domains.conf';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-player-money-bonus-modal-item',
  templateUrl: './player-money-bonus-modal-item.component.html',
  styleUrls: ['./player-money-bonus-modal-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerMoneyBonusModalItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public showButtons: boolean = true;

  public cdnServer: any;
  public str: string = '';

  constructor(public gamesService: GamesService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public showModalService: ShowModalService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  closeModal() {
    this.activeModal.close();
  }

  cancelPlayerMoneyBonus(bonusId: any) {
    this.closeModal();
    return this.playerMoneyBonusesService.cancelPlayerMoneyBonus(bonusId);
  }

  activatePlayerMoneyBonus(bonusId: any) {
    this.closeModal();
    return this.playerMoneyBonusesService.activatePlayerMoneyBonus(bonusId);
  }
}
