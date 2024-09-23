import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalLoginComponent} from '../modal-login/modal-login.component';
import {ModalRegistrationComponent} from '../modal-registration/modal-registration.component';
import {ModalCreateAccountComponent} from '../modal-create-account/modal-create-account.component';
import {ModalSearchComponent} from '../modal-search/modal-search.component';
import {ModalForgotPasswordComponent} from '../modal-forgot-password/modal-forgot-password.component';
import {ModalPaymentComponent} from '../modal-payment/modal-payment.component';
import {ModalPaymentRedirectComponent} from '../modal-payment-redirect/modal-payment-redirect.component';
import {ModalMessageComponent} from '../modal-message/modal-message.component';
import {ModalWarningComponent} from '../modal-warning/modal-warning.component';
import {ModalExceededMaximumBetComponent} from '../modal-exceeded-maximum-bet/modal-exceeded-maximum-bet.component';
import {ModalPlayFsComponent} from '../modal-play-fs/modal-play-fs.component';
import {ModalNewMoneyBonusComponent} from '../modal-new-money-bonus/modal-new-money-bonus.component';
import {ModalNewFsBonusComponent} from '../modal-new-fs-bonus/modal-new-fs-bonus.component';
import {ModalProviderAccountIsNotBonusComponent} from '../modal-provider-account-is-not-bonus/modal-provider-account-is-not-bonus.component';
import {ModalProviderAccountIsNotMoneyComponent} from '../modal-provider-account-is-not-money/modal-provider-account-is-not-money.component';
import {ModalProfileInfoComponent} from '../modal-profile-info/modal-profile-info.component';
import {ModalCreateCampaignComponent} from '../modal-create-campaign/modal-create-campaign.component';
import {ModalSetPasswordComponent} from '../modal-set-password/modal-set-password.component';
import {ModalAddToDesktopComponent} from '../modal-add-to-desktop/modal-add-to-desktop.component';
import {ModalNoDepositBonusesComponent} from '../modal-no-deposit-bonuses/modal-no-deposit-bonuses.component';
import {ModalPaymentPointToPointComponent} from '../modal-payment-point-to-point/modal-payment-point-to-point.component';
import {ModalPaymentFpsComponent} from '../modal-payment-fps/modal-payment-fps.component';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';
import {PlayerFsBonusesService} from '../../_core/services/player-fs-bonuses.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {PlayerService} from '../../_core/services/player.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {ModalFsBonusComponent} from '../modal-fs-bonus/modal-fs-bonus.component';
import {ModalMoneyBonusComponent} from '../modal-money-bonus/modal-money-bonus.component';
import {ModalPlayerFsBonusComponent} from '../modal-player-fs-bonus/modal-player-fs-bonus.component';
import {ModalPlayerMoneyBonusComponent} from '../modal-player-money-bonus/modal-player-money-bonus.component';


@Injectable({
  providedIn: 'root'
})
export class ShowModalService {

  constructor(private modalService: NgbModal,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public playerFsBonusesService: PlayerFsBonusesService,
              public authenticationService: AuthenticationService,
              public playerService: PlayerService,
              public translateService: TranslateService,
              public auth: AuthGuard) {

    authenticationService.registrationAndAuthorizationEvent.subscribe(() => {
      this.translateService.get('project.thanks_for_registration').subscribe((text: string) => {
        this.openModalMessage(text);
      });
    });

    authGuard.routeCanNotBeActivated.subscribe(() => {
      this.openModalLogin();
    });

    playerMoneyBonusesService.newPlayerMoneyBonusIssuedEvent.subscribe((data: any) => {
      if (!data.spendLocked) {
        this.openModalNewMoneyBonus(data);
      }
    });

    playerFsBonusesService.newPlayerFsBonusIssuedEvent.subscribe((data: any) => {
      this.openModalNewFsBonus(data);
    });

    playerService.exceededMaximumBetEvent.subscribe((data: any) => {
      this.openModalExceededMaximumBet(data.betAmount, data.betCurrency, data.bonus);
    });

    playerService.gameIsNotAllowedForBonusEvent.subscribe(() => {
      this.openModalMessage('notifications.wagering_is_not_possible_in_the_slot');
    });

    playerService.providerAccountIsNotBonusEvent.subscribe(() => {
      this.openModalProviderAccountIsNotBonus();
    });

    playerService.providerAccountIsNotMoneyEvent.subscribe(() => {
      this.openModalProviderAccountIsNotMoney();
    });

    playerMoneyBonusesService.moneyBonusConditionNotFulfilledEvent.subscribe((conditionName: string) => {
      if (conditionName === 'allow_duplicates') {
        this.openModalWarning('bonuses.bonus_not_available');
      }
    });

    playerFsBonusesService.fsBonusConditionNotFulfilledEvent.subscribe((conditionName: string) => {
      if (conditionName === 'allow_duplicates') {
        this.openModalWarning('bonuses.bonus_not_available');
      }
    });

    /*
    playerService.playerProfileChangedEvent.subscribe(() => {
      if (playerService.player &&
        playerService.player.email_confirmed &&
        playerService.player.profile_filled &&
        !playerService.player.deposited) {
        this.openModalNoDepositBonuses();
      }
    });
    */

    setTimeout(() => {
      if (!auth.isAuthorized() && !this.modalService.hasOpenModals()) {
        this.openModalRegistration();
      }
    }, 8 * 1000);
  }

  closeAllModals() {
    this.modalService.dismissAll();
  }

  openModalNoDepositBonuses() {
    this.modalService.dismissAll();
    this.modalService.open(ModalNoDepositBonusesComponent, {
      windowClass: 'modal-medium',
      backdrop: 'static'
    });
  }

  openModalRegistration() {
    this.modalService.dismissAll();
    this.modalService.open(ModalRegistrationComponent, {
      windowClass: 'modal-extrawide',
      backdrop: 'static'
    });
  }

  openModalLogin() {
    this.modalService.dismissAll();
    this.modalService.open(ModalLoginComponent, {
      windowClass: 'modal-extrawide',
      backdrop: 'static'
    });
  }

  openModalForgotPassword() {
    this.modalService.dismissAll();
    this.modalService.open(ModalForgotPasswordComponent, {
      windowClass: 'modal-password',
      backdrop: 'static'
    });
  }

  openModalChangePassword(token: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalSetPasswordComponent, {
      windowClass: 'modal-password',
      backdrop: 'static'
    });
    modalRef.componentInstance.token = token;
  }

  openModalPayment(url: string, commissionAmount: number, commissionCurrency: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPaymentComponent, {
      windowClass: 'modal-payment modal-payments-iframe',
      backdrop: 'static'
    });
    modalRef.componentInstance.url = url;
    modalRef.componentInstance.commissionAmount = commissionAmount;
    modalRef.componentInstance.commissionCurrency = commissionCurrency;
  }

  openModalPaymentRedirect(url: string, commissionAmount: number, commissionCurrency: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPaymentRedirectComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.url = url;
    modalRef.componentInstance.commissionAmount = commissionAmount;
    modalRef.componentInstance.commissionCurrency = commissionCurrency;
  }

  openModalMessage(message: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalMessageComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = message;
  }

  openModalWarning(message: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalWarningComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = message;
  }

  openModalExceededMaximumBet(betAmount: number, betCurrency: string, bonus: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalExceededMaximumBetComponent, {
      backdrop: 'static'
    });

    modalRef.componentInstance.betAmount = betAmount;
    modalRef.componentInstance.betCurrency = betCurrency;
    modalRef.componentInstance.bonus = bonus;
  }

  openModalPlayFs(bonus: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPlayFsComponent, {
      // windowClass: 'modal-bonus',
      backdrop: 'static'
    });
    modalRef.componentInstance.bonus = bonus;
  }

  openModalNewMoneyBonus(bonus: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalNewMoneyBonusComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.bonus = bonus;
  }

  openModalNewFsBonus(bonus: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalNewFsBonusComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.bonus = bonus;
  }

  openModalProviderAccountIsNotBonus() {
    this.modalService.dismissAll();
    this.modalService.open(ModalProviderAccountIsNotBonusComponent, {
      backdrop: 'static'
    });
  }

  openModalProviderAccountIsNotMoney() {
    this.modalService.dismissAll();
    this.modalService.open(ModalProviderAccountIsNotMoneyComponent, {
      backdrop: 'static'
    });
  }

  openModalProfileInfo(fieldsRequired: any, message: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalProfileInfoComponent, {
      windowClass: 'modal-profile',
      backdrop: 'static'
    });
    modalRef.componentInstance.fieldsRequired = fieldsRequired;
    modalRef.componentInstance.message = message;
  }

  openModalCreateCampaign() {
    this.modalService.dismissAll();
    this.modalService.open(ModalCreateCampaignComponent, {
      backdrop: 'static'
    });
  }

  openModalCreateAccount(currenciesFiltered: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalCreateAccountComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.currenciesFiltered = currenciesFiltered;
  }

  openModalSearch(tab: any) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalSearchComponent, {
      windowClass: 'modal-search-game',
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.tab = tab;
  }

  openModalAddToDesktop() {
    this.modalService.dismissAll();
    this.modalService.open(ModalAddToDesktopComponent, {
      windowClass: 'modal-extrawide',
      backdrop: 'static',
    });
  }

  openModalPaymentPointToPoint(id: number, amount: number, currencyCode: string, bank: string
    , card: string, recipient: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPaymentPointToPointComponent, {
      windowClass: 'modal-medium',
      backdrop: 'static'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.currencyCode = currencyCode;
    modalRef.componentInstance.bank = bank;
    modalRef.componentInstance.card = card;
    modalRef.componentInstance.recipient = recipient;
  }

  openModalPaymentFps(id: number, amount: number, currencyCode: string, bank: string, phoneNumber: string, recipient: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPaymentFpsComponent, {
      windowClass: 'modal-medium',
      backdrop: 'static'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.currencyCode = currencyCode;
    modalRef.componentInstance.bank = bank;
    modalRef.componentInstance.phoneNumber = phoneNumber;
    modalRef.componentInstance.recipient = recipient;
  }

  openModalContent(name: string) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalContentComponent, {
      windowClass: 'modal-medium',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = name;
  }

  openModalFsBonus(bonus: any, showLink: boolean, showCancel: boolean, promoCode: any) {
    this.modalService.dismissAll();
      const modalRef = this.modalService.open(ModalFsBonusComponent, {
        windowClass: 'modal-medium',
        backdrop: 'static'
      });
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.showLink = showLink;
    modalRef.componentInstance.showCancel = showCancel;
    modalRef.componentInstance.promoCode = promoCode;
  }
  
  openModalPlayerFsBonus(bonus: any, showButtons: boolean) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalPlayerFsBonusComponent, {
      windowClass: 'modal-medium',
      backdrop: 'static'
    });
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.showButtons = showButtons;
  }

  openModalMoneyBonus(bonus: any, showLink: boolean, showCancel: boolean, promoCode: any) {
    this.modalService.dismissAll();
      const modalRef = this.modalService.open(ModalMoneyBonusComponent, {
        windowClass: 'modal-medium',
        backdrop: 'static'
      });
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.showLink = showLink;
    modalRef.componentInstance.showCancel = showCancel;
    modalRef.componentInstance.promoCode = promoCode;
  }

  openModalPlayerMoneyBonus(bonus: any, showButtons: boolean) {
    this.modalService.dismissAll();
      const modalRef = this.modalService.open(ModalPlayerMoneyBonusComponent, {
        windowClass: 'modal-medium',
        backdrop: 'static'
      });
    modalRef.componentInstance.bonus = bonus;
    modalRef.componentInstance.showButtons = showButtons;
  }
}
