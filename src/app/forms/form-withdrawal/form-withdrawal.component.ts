import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentsDataSource} from '../../_core/datasources/payments.datasource';
import {NotifierService} from 'angular-notifier';
import {PaymentsService} from '../../_core/services/payments.service';
import {TranslateService} from '@ngx-translate/core';
import {PlayerService} from '../../_core/services/player.service';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {first} from 'rxjs/operators';
import {DomainsConfig} from '../../_configs/domains.conf';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import { BanksPublicDataSource } from 'src/app/_core/datasources/banks-public.datasource';


@Component({
  selector: 'app-form-withdrawal',
  templateUrl: './form-withdrawal.component.html',
  styleUrls: ['./form-withdrawal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormWithdrawalComponent implements OnInit {

  @Input() public serviceId: any;
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  errors: string = '';
  loading: boolean = false;

  public currencies: any;
  public selectedCurrencyCode: string;

  public paymentMethodsFiltered: any = [];
  public selectedPaymentMethod: any;

  public accountFieldExample: string = '';
  public accountRequired: boolean = false;
  public expirationDateRequired: boolean = false;
  public accounts: any;

  public cdnServer: any;

  public banks: any;
  public selectedBank: any;

  constructor(public formBuilder: FormBuilder,
              public paymentsDataSource: PaymentsDataSource,
              public notifierService: NotifierService,
              public paymentsService: PaymentsService,
              public translateService: TranslateService,
              public playerService: PlayerService,
              public showModalService: ShowModalService,
              public banksPublicDataSource: BanksPublicDataSource,
              public currenciesService: CurrenciesService) {
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      currency: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      account: [''],
      expirationDateMonth: [''],
      expirationDateYear: [''],
      bankId: [''],
    });

    this.accounts = this.playerService.accounts;
    this.playerService.playerAccountsReceivedEvent.subscribe(() => {
      this.accounts = this.playerService.accounts;
    });

    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.paymentsService.paymentWithdrawalMethodsReceivedEvent.subscribe(() => {
      if (this.selectedCurrencyCode) {
        this.onChangeCurrency(this.selectedCurrencyCode);
      }
    });

    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.selectedCurrencyCode = this.playerService.currencyCode;
      this.onChangeCurrency(this.selectedCurrencyCode);
      this.getBanks();
    });

    if (this.playerService.currencyCode) {
      this.selectedCurrencyCode = this.playerService.currencyCode;
      this.onChangeCurrency(this.selectedCurrencyCode);
      this.getBanks();
    }

    this.cdnServer = DomainsConfig.cdnServer;

    this.playerService.getPlayerAccounts();
  }

  getBanks() {
    if (!this.selectedCurrencyCode) {
      return;
    }

    this.banksPublicDataSource.getBanks(this.selectedCurrencyCode)
    .pipe(first())
      .subscribe((data: any) => {
        this.banks = data;
      });
  }

  get f() {
    return this.formGroup.controls;
  }

  onChangeCurrency(currencyCode: any) {

    if (!this.paymentsService.withdrawalMethods) {
      return;
    }

    this.selectedCurrencyCode = currencyCode;
    this.paymentMethodsFiltered = this.paymentsService.withdrawalMethods.filter(method => method.currency_code === currencyCode);

    this.formGroup.patchValue({
      currency: currencyCode,
    });
  }

  onChangeMethod(paymentMethod: any) {
    this.selectedPaymentMethod = paymentMethod;
    this.accountRequired = paymentMethod.account_required;
    this.expirationDateRequired = paymentMethod.expiration_date_required;
    this.accountFieldExample = paymentMethod.field_example;

    this.f['amount'].clearValidators();

    this.f['account'].clearValidators();

    this.f['expirationDateMonth'].clearValidators();
    this.f['expirationDateYear'].clearValidators();

    this.f['bankId'].clearValidators();

    this.f['bankId'].setValue('');
    if (paymentMethod.payment_service_name == 'fps') {
      this.f['bankId'].setValidators([
        Validators.required,
      ]);
    }

    this.f['amount'].setValidators([
      Validators.required,
      Validators.min(paymentMethod.limit_minimum),
      Validators.max(paymentMethod.limit_maximum)
    ]);

    if (paymentMethod.account_required) {
      this.f['account'].setValidators([
        Validators.required,
        Validators.pattern(paymentMethod.field_regex)
      ]);
    }

    if (paymentMethod.expiration_date_required) {
      this.f['expirationDateMonth'].setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]);
      this.f['expirationDateYear'].setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]);
    }

    this.f['amount'].updateValueAndValidity();

    this.f['account'].updateValueAndValidity();

    this.f['expirationDateMonth'].updateValueAndValidity();
    this.f['expirationDateYear'].updateValueAndValidity();

    this.f['bankId'].updateValueAndValidity();

    this.formGroup.patchValue({
      paymentMethod: paymentMethod.id,
    });
  }

  onChangeBank(bank: any) {
    this.selectedBank = bank;
    this.f['bankId'].setValue(bank.id);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.paymentsDataSource.withdraw(
      this.selectedPaymentMethod.id,
      this.f.amount.value,
      this.f.account.value,
      this.f.expirationDateMonth.value,
      this.f.expirationDateYear.value,
      this.f.bankId.value,
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          if (data.fieldsRequired) {
            this.translateService.get('modal.complete_profile_to_continue').subscribe((text: string) => {
              this.showModalService.openModalProfileInfo(data.fieldsRequired, text);
            });
          } else {
            this.translateService.get('payments.withdrawal_created').subscribe((text: string) => {
              this.notifierService.notify('success', text);
            });

            this.playerService.withdrawalCreatedEvent.emit();
          }

          this.successEvent.emit();
        },
        error => {
          this.errors = error;
          this.loading = false;
        });
  }

  getAccountPlaceholder(selectedPaymentMethod: any) {
    return this.paymentsService.getAccountPlaceholder(selectedPaymentMethod);
  }

  getImagePatchNotSelected(image: string) {
    return `${this.cdnServer}/payments/${image}`;
  }

  getImagePatchSelected(image: string) {
    return `${this.cdnServer}/payments_s/${image}`;
  }

  getStyleBack(paymentMethod: any) {

    if (paymentMethod === this.selectedPaymentMethod) {

      if (paymentMethod.image) {
        return {
          'background-image': `url(${this.getImagePatchSelected(paymentMethod.image)})`
        };
      } else {
        return {
          'background-image': `url(${this.getImagePatchSelected(paymentMethod.payment_service_image)})`
        };
      }

    } else {

      if (paymentMethod.image) {
        return {
          'background-image': `url(${this.getImagePatchNotSelected(paymentMethod.image)})`
        };
      } else {
        return {
          'background-image': `url(${this.getImagePatchNotSelected(paymentMethod.payment_service_image)})`
        };
      }
    }
  }
}
