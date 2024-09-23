import {NgModule} from '@angular/core';
import {SetAffiliateRedirectComponent} from './components/set-affiliate-redirect.component';
import {ChangePasswordModalRedirectComponent} from './components/change-password-modal-redirect.component';
import {ConfirmationModalRedirectComponent} from './components/confirmation-modal-redirect.component';
import {LoginModalRedirectComponent} from './components/login-modal-redirect.component';
import {RegisterModalRedirectComponent} from './components/register-modal-redirect.component';
import {ForgotPasswordModalRedirectComponent} from './components/forgot-password-modal-redirect.component';
import {UnsubscribeRedirectComponent} from './components/unsubscribe-redirect.component';
import {CommonModule} from '@angular/common';
import {RedirectsRoutingModule} from './redirects-routing.module';
import {ActivationPromoCodeRedirectComponent} from './components/activation-promo-code-redirect.component';
import {PaymentStatusRedirectComponent} from './components/payment-status-redirect.component';


@NgModule({
  imports: [
    CommonModule,
    RedirectsRoutingModule
  ],
  declarations: [
    ChangePasswordModalRedirectComponent,
    ConfirmationModalRedirectComponent,
    LoginModalRedirectComponent,
    RegisterModalRedirectComponent,
    ForgotPasswordModalRedirectComponent,
    UnsubscribeRedirectComponent,
    SetAffiliateRedirectComponent,
    ActivationPromoCodeRedirectComponent,
    PaymentStatusRedirectComponent,
  ],
  exports: [
    ChangePasswordModalRedirectComponent,
    ConfirmationModalRedirectComponent,
    LoginModalRedirectComponent,
    RegisterModalRedirectComponent,
    ForgotPasswordModalRedirectComponent,
    UnsubscribeRedirectComponent,
    SetAffiliateRedirectComponent,
    ActivationPromoCodeRedirectComponent,
    PaymentStatusRedirectComponent,
  ],
})
export class RedirectsModule {
}
