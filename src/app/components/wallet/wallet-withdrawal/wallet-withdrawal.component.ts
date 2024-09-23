import {Component, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../../../_core/services/player.service';


@Component({
  selector: 'app-wallet-withdrawal',
  templateUrl: './wallet-withdrawal.component.html',
  styleUrls: ['./wallet-withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WalletWithdrawalComponent {

  constructor(public playerService: PlayerService) {
  }

  isVerified() {
    if (!this.playerService.player) {
      return false;
    }

    return this.playerService.player.verified;
  }
}
