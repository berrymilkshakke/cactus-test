import {Component, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-layout-info',
  templateUrl: './layout-test.component.html',
  styleUrls: ['./layout-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutTestComponent { 

  constructor(public showModalService: ShowModalService,
              public translateService: TranslateService,
              public notifierService: NotifierService) {
  }

  openModalNoDepositBonuses() {
    this.showModalService.openModalNoDepositBonuses();
  }

  openModalRegistration() {
    this.showModalService.openModalRegistration();
  }

  openModalLogin() {
    this.showModalService.openModalLogin();
  }

  openModalForgotPassword() {
    this.showModalService.openModalForgotPassword();
  }

  openModalChangePassword() {
    this.showModalService.openModalChangePassword('123');
  }

  openModalPayment() {
    this.showModalService.openModalPayment('', 12, 'USD');
  }

  openModalPaymentRedirect() {
    this.showModalService.openModalPaymentRedirect('/', 12, 'USD');
  }

  openModalMessage() {
    this.translateService.get('project.thanks_for_registration').subscribe((text: string) => {
      this.showModalService.openModalMessage(text);
    });
    // this.showModalService.openModalMessage('test message');
  }

  openModalWarning() {
    this.showModalService.openModalWarning('test message');
  }

  openModalExceededMaximumBet() {
    const bonus = {
      title: 'Test',
      created_at: '2025-11-12 12:22:15',
      bonus_amount: 12,
      currency_code: 'USD',
      wager_current_amount: 12,
      wager_required_amount: 300,
      maximum_bet: 500,
      wagering_expires_at: '2025-11-12 12:22:15',
      canceled: false,
      activated: true,
    };

    this.showModalService.openModalExceededMaximumBet(12, 'USD', bonus);
  }

  openModalPlayFs() {
    const fsBonus = {
      fs_balance: 10,
      game_title: 'Space Wars',
      game_brand_name: 'netent',
      game_name: 'starburst_xxxtreme'
    };

    this.showModalService.openModalPlayFs(fsBonus);
  }

  openModalPlayerMoneyBonus() {
    const bonus = {
      title: 'Test',
      id: '1',
      fs_amount: 50,
      game_title: 'Space Wars',
      minimum_dep: 5,
      minimum_bonus: 50,
      maximum_winning_amount: 10,
      wager: 50,
      time_play_back: 1,
      currency_code: 'USD',
      deposit_bonus_availability: 4,
      canceled: false,
      activated: false,
    };

    const showButtons = true;

    this.showModalService.openModalPlayerMoneyBonus(bonus, showButtons);
  }

  openModalNewMoneyBonus() {
    const bonus = {
      activated: true,
      spendLocked: true,
      amount: 12,
      currencyCode: 'USD',
      wageringExpiresAt: '2025-11-12 12:22:15'
    };

    this.showModalService.openModalNewMoneyBonus(bonus);
  }

  openModalNewFsBonus() {
    const fsBonus = {
      amount: 10,
      gameTitle: 'Space Wars',
      activated: true, // false
      image: '',
      gameBrandName: 'netent',
      gameName: 'starburst_xxxtreme'
    };

    this.showModalService.openModalNewFsBonus(fsBonus);
  }

  openModalNewMoneyBonusWithUnlock() {
    const bonus = {
      activated: true,
      spendLocked: true,
      amount: 12,
      currencyCode: 'USD',
      wageringExpiresAt: '2025-11-12 12:22:15',
      unlockAfterDeposit: 40,
    };

    this.showModalService.openModalNewMoneyBonus(bonus);
  }

  openModalProviderAccountIsNotBonus() {
    this.showModalService.openModalProviderAccountIsNotBonus();
  }

  openModalProviderAccountIsNotMoney() {
    this.showModalService.openModalProviderAccountIsNotMoney();
  }

  openModalProfileInfo() {
    this.showModalService.openModalProfileInfo(['first_name'], 'message text');
  }

  openModalCreateCampaign() {
    this.showModalService.openModalCreateCampaign();
  }

  openModalCreateAccount() {
    this.showModalService.openModalCreateAccount(['USD', 'EUR']);
  }

  openModalSearch() {
    this.showModalService.openModalSearch(['games']);
  }

  openModalAddToDesktop() {
    this.showModalService.openModalAddToDesktop();
  }

  openModalPaymentPointToPoint() {
    this.showModalService.openModalPaymentPointToPoint(
      1, 12.30, 'USD', 'tinkoff', '1111222233334444', 'Иванов В.В'
    );
  }

  openModalPaymentFps() {
    this.showModalService.openModalPaymentFps(
      1, 12.30, 'USD', 'tinkoff', '7123456789', 'Иванов В.В'
    );
  }

  openModalContent() {
    this.showModalService.openModalContent('test');
  }

  /***************************************************************************************************************** */


  confirmationEmailSent() {
    this.translateService.get('auth.confirmation_email_sent').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  confirmSuccess() {
    this.translateService.get('auth.confirm_success').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  conditionNoDepositBonus() {
    this.translateService.get('bonuses.condition_no_deposit_bonus').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  youHaveANewBonus() {
    this.translateService.get('notifications.you_have_a_new_bonus')
      .subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
  }

  youHaveANewActivatedBonus() {
    this.translateService.get('notifications.you_have_a_new_activated_bonus')
      .subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });
  }

  bonusWagered() {
    this.translateService.get('notifications.bonus_wagered').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  newLevel() {
    this.translateService.get('notifications.new_level').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  depositCompleted() {
    this.translateService.get('notifications.deposit_completed').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });
  }

  error() {
    this.translateService.get('payments.error').subscribe((text: string) => {
      this.notifierService.notify('error', text);
    });
  }
}
