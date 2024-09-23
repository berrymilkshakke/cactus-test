import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../../_core/services/player.service';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BalanceDetailsComponent {

  public account: any;

  constructor(public playerService: PlayerService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService) {

    this.account = this.playerService.defaultAccount;
    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.account = this.playerService.defaultAccount;
    });
  }

  getActiveBonus() {
    return this.playerMoneyBonusesService.activeBonus;
  }

  getActiveBonusProgress() {
    return this.playerMoneyBonusesService.activeBonusProgress;
  }
}
