import {Injectable} from '@angular/core';
import {PlayerService} from '../../_core/services/player.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Injectable({
  providedIn: 'root'
})
export class ShowNotificationService {

  constructor(public playerService: PlayerService,
              public playerBonusesService: PlayerMoneyBonusesService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public authenticationService: AuthenticationService) {

    /*
    authenticationService.registrationAndAuthorizationEvent.subscribe(() => {
      this.translateService.get('auth.confirmation_email_sent').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });
    */

    authenticationService.confirmationEvent.subscribe(() => {
      this.translateService.get('auth.confirm_success').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });

    /*
    authenticationService.authorizationEvent.subscribe(() => {
      this.notifierService.hideAll();
    });
    */

    playerBonusesService.newPlayerMoneyBonusIssuedEvent.subscribe((data: any) => {
      if (data.spendLocked) {
        if (!data.activated) {
          this.translateService.get('notifications.you_have_a_new_bonus')
            .subscribe((text: string) => {
              this.notifierService.notify('success', text);
            });
        } else {
          this.translateService.get('notifications.you_have_a_new_activated_bonus')
            .subscribe((text: string) => {
              this.notifierService.notify('success', text);
            });
        }
      }
    });

    /*
    playerService.newPlayerFsBonusIssuedEvent.subscribe((data: any) => {
      this.translateService.get('notifications.you_have_a_new_fs_bonus')
        .subscribe((text: string) => {
          this.notifierService.notify('success', text);
        });
    });
    */

    playerBonusesService.playerMoneyBonusWageredEvent.subscribe(() => {
      this.translateService.get('notifications.bonus_wagered').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });

    playerService.newLevelEvent.subscribe(() => {
      this.translateService.get('notifications.new_level').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });

    playerService.depositCompletedEvent.subscribe(() => {
      this.translateService.get('notifications.deposit_completed').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });

    playerService.playerEmailChangedEvent.subscribe(() => {
      this.translateService.get('auth.confirmation_email_sent').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
    });
  }

}
