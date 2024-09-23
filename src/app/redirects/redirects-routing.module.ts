import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginModalRedirectComponent} from './components/login-modal-redirect.component';
import {RegisterModalRedirectComponent} from './components/register-modal-redirect.component';
import {ForgotPasswordModalRedirectComponent} from './components/forgot-password-modal-redirect.component';
import {ConfirmationModalRedirectComponent} from './components/confirmation-modal-redirect.component';
import {ChangePasswordModalRedirectComponent} from './components/change-password-modal-redirect.component';
import {UnsubscribeRedirectComponent} from './components/unsubscribe-redirect.component';
import {SetAffiliateRedirectComponent} from './components/set-affiliate-redirect.component';
import {ActivationPromoCodeRedirectComponent} from './components/activation-promo-code-redirect.component';
import {PaymentStatusRedirectComponent} from './components/payment-status-redirect.component';


const routes: Routes = [{
  path: '',
  children: [

    {
      path: 'login',
      component: LoginModalRedirectComponent,
    },

    {
      path: 'registration',
      component: RegisterModalRedirectComponent,
    },

    {
      path: 'forgot-password',
      component: ForgotPasswordModalRedirectComponent,
    },

    {
      path: 'verify/:token',
      component: ConfirmationModalRedirectComponent,
    },

    {
      path: 'change-password/:token',
      component: ChangePasswordModalRedirectComponent,
    },

    {
      path: 'unsubscribe/:groupId/:login',
      component: UnsubscribeRedirectComponent,
    },

    {
      path: 'affiliate/:linkCode',
      component: SetAffiliateRedirectComponent,
    },

    {
      path: 'promo-code/:promoCode',
      component: ActivationPromoCodeRedirectComponent,
    },

    {
      path: 'payment-status/:status',
      component: PaymentStatusRedirectComponent,
    },

  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectsRoutingModule {
}
