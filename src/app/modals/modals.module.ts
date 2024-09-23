import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormsModule} from '../forms/forms.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '../app-routing.module';
import {ModalLoginComponent} from './modal-login/modal-login.component';
import {ComponentsModule} from '../components/components.module';
import {ComponentsBonusModule} from '../components-bonus/components-bonus.module';
import {ModalRegistrationComponent} from './modal-registration/modal-registration.component';
import {ModalCreateAccountComponent} from './modal-create-account/modal-create-account.component';
import {ModalSearchComponent} from './modal-search/modal-search.component';
import {FormsModule} from '@angular/forms';
import {ModalCreateCampaignComponent} from './modal-create-campaign/modal-create-campaign.component';
import {ModalExceededMaximumBetComponent} from './modal-exceeded-maximum-bet/modal-exceeded-maximum-bet.component';
import {ModalMessageComponent} from './modal-message/modal-message.component';
import {ModalNewFsBonusComponent} from './modal-new-fs-bonus/modal-new-fs-bonus.component';
import {ModalNewMoneyBonusComponent} from './modal-new-money-bonus/modal-new-money-bonus.component';
import {ModalPaymentRedirectComponent} from './modal-payment-redirect/modal-payment-redirect.component';
import {ModalPlayFsComponent} from './modal-play-fs/modal-play-fs.component';
import {ModalProfileInfoComponent} from './modal-profile-info/modal-profile-info.component';
import {ModalForgotPasswordComponent} from './modal-forgot-password/modal-forgot-password.component';
import {ModalProviderAccountIsNotBonusComponent} from './modal-provider-account-is-not-bonus/modal-provider-account-is-not-bonus.component';
import {ModalProviderAccountIsNotMoneyComponent} from './modal-provider-account-is-not-money/modal-provider-account-is-not-money.component';
import {ModalSetPasswordComponent} from './modal-set-password/modal-set-password.component';
import {ModalPaymentComponent} from './modal-payment/modal-payment.component';
import {ModalWarningComponent} from './modal-warning/modal-warning.component';
import {PipesModule} from '../_core/pipes/pipes.module';
import {ModalAddToDesktopComponent} from './modal-add-to-desktop/modal-add-to-desktop.component';
import {ModalNoDepositBonusesComponent} from './modal-no-deposit-bonuses/modal-no-deposit-bonuses.component';
import {ModalPaymentPointToPointComponent} from './modal-payment-point-to-point/modal-payment-point-to-point.component';
import {ModalPaymentFpsComponent} from './modal-payment-fps/modal-payment-fps.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ModalContentComponent} from './modal-content/modal-content.component';
import {ModalFsBonusComponent} from './modal-fs-bonus/modal-fs-bonus.component';
import {ModalMoneyBonusComponent} from './modal-money-bonus/modal-money-bonus.component';
import {ModalPlayerFsBonusComponent} from './modal-player-fs-bonus/modal-player-fs-bonus.component';
import {ModalPlayerMoneyBonusComponent} from './modal-player-money-bonus/modal-player-money-bonus.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
    AppFormsModule,
    TranslateModule,
    ComponentsModule,
    ComponentsBonusModule,
    FormsModule,
    PipesModule,
    PerfectScrollbarModule,
  ],
  declarations: [
    ModalLoginComponent,
    ModalRegistrationComponent,
    ModalCreateAccountComponent,
    ModalSearchComponent,
    ModalCreateCampaignComponent,
    ModalExceededMaximumBetComponent,
    ModalMessageComponent,
    ModalNewFsBonusComponent,
    ModalNewMoneyBonusComponent,
    ModalPaymentRedirectComponent,
    ModalPlayFsComponent,
    ModalProfileInfoComponent,
    ModalForgotPasswordComponent,
    ModalProviderAccountIsNotBonusComponent,
    ModalProviderAccountIsNotMoneyComponent,
    ModalSetPasswordComponent,
    ModalPaymentComponent,
    ModalWarningComponent,
    ModalAddToDesktopComponent,
    ModalNoDepositBonusesComponent,
    ModalPaymentPointToPointComponent,
    ModalPaymentFpsComponent,
    ModalContentComponent,
    ModalFsBonusComponent,
    ModalMoneyBonusComponent,
    ModalPlayerFsBonusComponent,
    ModalPlayerMoneyBonusComponent
  ],
  entryComponents: [
    ModalLoginComponent,
    ModalRegistrationComponent,
    ModalCreateAccountComponent,
    ModalSearchComponent,
    ModalCreateCampaignComponent,
    ModalExceededMaximumBetComponent,
    ModalMessageComponent,
    ModalNewFsBonusComponent,
    ModalNewMoneyBonusComponent,
    ModalPaymentRedirectComponent,
    ModalPlayFsComponent,
    ModalProfileInfoComponent,
    ModalForgotPasswordComponent,
    ModalProviderAccountIsNotBonusComponent,
    ModalProviderAccountIsNotMoneyComponent,
    ModalSetPasswordComponent,
    ModalPaymentComponent,
    ModalWarningComponent,
    ModalAddToDesktopComponent,
    ModalNoDepositBonusesComponent,
    ModalPaymentPointToPointComponent,
    ModalPaymentFpsComponent,
    ModalContentComponent,
    ModalFsBonusComponent,
    ModalMoneyBonusComponent,
    ModalPlayerFsBonusComponent,
    ModalPlayerMoneyBonusComponent
  ],
  exports: [
    ModalLoginComponent,
    ModalRegistrationComponent,
    ModalCreateAccountComponent,
    ModalSearchComponent,
    ModalCreateCampaignComponent,
    ModalExceededMaximumBetComponent,
    ModalMessageComponent,
    ModalNewFsBonusComponent,
    ModalNewMoneyBonusComponent,
    ModalPaymentRedirectComponent,
    ModalPlayFsComponent,
    ModalProfileInfoComponent,
    ModalForgotPasswordComponent,
    ModalProviderAccountIsNotBonusComponent,
    ModalProviderAccountIsNotMoneyComponent,
    ModalSetPasswordComponent,
    ModalPaymentComponent,
    ModalWarningComponent,
    ModalAddToDesktopComponent,
    ModalNoDepositBonusesComponent,
    ModalPaymentPointToPointComponent,
    ModalPaymentFpsComponent,
    ModalContentComponent,
    ModalFsBonusComponent,
    ModalMoneyBonusComponent,
    ModalPlayerFsBonusComponent,
    ModalPlayerMoneyBonusComponent
  ],
})
export class AppModalsModule {
}
