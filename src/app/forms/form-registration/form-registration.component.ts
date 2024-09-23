import {Component, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {SystemConfig} from '../../_configs/system.conf';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {LanguagesService} from '../../_core/services/languages.service';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {CookieService} from 'ngx-cookie-service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {GuestService} from '../../_core/services/guest.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import { PromoCodesService } from 'src/app/_core/services/promo-codes.service';


@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormRegistrationComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  errors: string = '';
  loading: boolean = false;

  currencies: any;

  public showPromoCodeField: boolean = false;

  public showCurrencySelection: boolean = false;

  constructor(public formBuilder: FormBuilder,
              public authenticationService: AuthenticationService,
              public notifierService: NotifierService,
              public translateService: TranslateService,
              public languagesService: LanguagesService,
              public currenciesService: CurrenciesService,
              public cookieService: CookieService,
              public showModalService: ShowModalService,
              public promoCodesService: PromoCodesService,
              public guestService: GuestService) {

    this.showCurrencySelection = DomainsConfig.showCurrencySelection;
  }

  ngOnInit() {
    const receiveNewsletters = SystemConfig.receiveNewsletters;

    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.formGroup = this.formBuilder.group({
      login: ['', Validators.compose(
        [Validators.required, Validators.email]
      )],
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(SystemConfig.passwordMinLength)]
      )],
      currency: [this.guestService.currencyCode, Validators.required],
      promoCode: ['', Validators.minLength(4)],
      rules: [true, Validators.requiredTrue],
      subscription: [receiveNewsletters || false, Validators.required],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const promoCode = this.f.promoCode.value;
    if (promoCode) {
      this.promoCodesService.saveCode(promoCode);
    }

    this.loading = true;
    this.authenticationService.register(
      this.f.login.value,
      this.f.password.value,
      this.f.currency.value,
      this.f.subscription.value,
      this.languagesService.getCurrentLanguage(),
      this.cookieService.get(SystemConfig.affiliateCookie.linkCodeName),
      this.cookieService.get(SystemConfig.affiliateCookie.clickIdName)
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.successEvent.emit();
        },
        error => {
          this.errors = error;
          this.loading = false;
        });
  }

  onChangeCurrency(currencyCode: any) {
    this.formGroup.patchValue({
      currency: currencyCode,
    });
  }

  switchPromoCodeField() {
    this.showPromoCodeField = true;
  }
}
