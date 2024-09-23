import {Component, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerService} from '../../_core/services/player.service';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-no-deposit-conditions',
  templateUrl: './no-deposit-conditions.component.html',
  styleUrls: ['./no-deposit-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoDepositConditionsComponent {

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public playerService: PlayerService) {
  }

  getPlayer() {
    if (this.playerService.player) {
      return this.playerService.player;
    } else {
      return false;
    }
  }

  isPlayerDeposited() {
    if (this.playerService.player) {
      return this.playerService.player.deposited;
    } else {
      return false;
    }
  }

  isProfileFilled() {
    if (this.playerService.player) {
      return this.playerService.player.profile_filled;
    } else {
      return false;
    }
  }

  isEmailConfirmed() {
    if (this.playerService.player) {
      return this.playerService.player.email_confirmed;
    } else {
      return false;
    }
  }
}
