import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {FormLoginComponent} from './form-login/form-login.component';
import {AppRoutingModule} from '../app-routing.module';
import {AppPasswordDirective} from '../_core/directives/app-password.directive';
import {FormRegistrationComponent} from './form-registration/form-registration.component';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ComponentsBonusModule} from '../components-bonus/components-bonus.module';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgSwitcheryModule} from 'angular-switchery-ios';
import {FormForgotPasswordComponent} from './form-forgot-password/form-forgot-password.component';
import {FormSetPasswordComponent} from './form-set-password/form-set-password.component';
import {FormPromoCodeComponent} from './form-promo-code/form-promo-code.component';
import {FormChangePasswordComponent} from './form-change-password/form-change-password.component';
import {FormEditPlayerInfoComponent} from './form-edit-player-info/form-edit-player-info.component';
import {FormDepositComponent} from './form-deposit/form-deposit.component';
import {FormEditPhoneNumberComponent} from './form-edit-phone-number/form-edit-phone-number.component';
import {FormUploadDocumentComponent} from './form-upload-document/form-upload-document.component';
import {FormCreateAffiliateComponent} from './form-create-affiliate/form-create-affiliate.component';
import {FormCreateCampaignComponent} from './form-create-campaign/form-create-campaign.component';
import {FormWithdrawalComponent} from './form-withdrawal/form-withdrawal.component';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    NgxTrimDirectiveModule,
    PerfectScrollbarModule,
    NgSwitcheryModule,
    ComponentsBonusModule,
    SlickCarouselModule,

    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
  ],
  declarations: [
    AppPasswordDirective,

    FormForgotPasswordComponent,
    FormSetPasswordComponent,
    FormPromoCodeComponent,
    FormChangePasswordComponent,
    FormEditPlayerInfoComponent,
    FormDepositComponent,
    FormWithdrawalComponent,
    FormEditPhoneNumberComponent,
    FormUploadDocumentComponent,
    FormCreateAffiliateComponent,
    FormCreateCampaignComponent,

    FormLoginComponent,
    FormRegistrationComponent,
  ],
  exports: [
    FormForgotPasswordComponent,
    FormSetPasswordComponent,
    FormPromoCodeComponent,
    FormChangePasswordComponent,
    FormEditPlayerInfoComponent,
    FormDepositComponent,
    FormWithdrawalComponent,
    FormEditPhoneNumberComponent,
    FormUploadDocumentComponent,
    FormCreateAffiliateComponent,
    FormCreateCampaignComponent,

    FormLoginComponent,
    FormRegistrationComponent,
  ],
})
export class AppFormsModule {
}
