import {Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {SystemConfig} from '../../_configs/system.conf';
import {PaymentsService} from '../../_core/services/payments.service';
import {PlayerService} from '../../_core/services/player.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {PaymentsDataSource} from '../../_core/datasources/payments.datasource';
import {MoneyBonusesService} from '../../_core/services/money-bonuses.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {PromoCodesService} from '../../_core/services/promo-codes.service';
import {ActivatedRoute} from '@angular/router';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {TranslateService} from '@ngx-translate/core';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';
import { PreloaderService } from 'src/app/_core/services/preloader.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {Helper} from '../../_core/classes/helper';


@Component({
  selector: 'app-form-deposit',
  templateUrl: './form-deposit.component.html',
  styleUrls: ['./form-deposit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDepositComponent implements OnInit {

  @ViewChild('slickModal', null) slickModal: any;

  @Input() public simplified: boolean = false;

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  errors: string = '';
  loading: boolean = false;

  public currencies: any;
  public selectedCurrencyCode: string;

  public paymentMethodsFiltered: any = [];
  public paymentMethodsFilteredByServiceGroup: any;

  public selectedPaymentMethod: any;

  public accountFieldExample: string = '';
  public accountRequired: boolean = false;
  public expirationDateRequired: boolean = false;

  public selectedAmount: string;
  public selectedServiceGroup: string;
  public isLastSuccessGroupSelected: any;

  public limitServices: number = 3;

  public amounts: number[] = [1000, 2000, 5000];
  public amountsRUB: number[] = [500, 1000, 5000];
  public amountsUAH: number[] = [350, 700, 2000];
  public amountsUSD: number[] = [20, 50, 200];
  public amountsEUR: number[] = [20, 50, 200];
  public amountsPLN: number[] = [20, 50, 70];
  public amountsUZS: number[] = [40000, 100000, 200000];

  public promoCode: any;

  public moneyBonus: any;
  public fsBonus: any;

  public moneyBonusId: number;
  public fsBonusId: number;

  public groupPaymentMethods: boolean = false;
  public tab: string = 'bonuses';

  public slideConfig: any = {
    infinite: false,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    autoplay: false,
    vertical: false,
    arrows: false,
    dots: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.2,
        }
      }
    ]
  };

  public moneyBonuses: any;
  public fsBonuses: any;
  public limitMinimum: number = 0;
  public lastSuccessDepositMethod: any;
  public serviceGroups: any;
  public activeMoneyBonus: any;

  public cdnServer: any;

  public isBonusAllowed: boolean;
  public isUnslickSlider: boolean;

  constructor(public formBuilder: FormBuilder,
              public paymentsDataSource: PaymentsDataSource,
              public paymentsService: PaymentsService,
              public playerService: PlayerService,
              public showModalService: ShowModalService,
              public moneyBonusesService: MoneyBonusesService,
              public fsBonusesService: FsBonusesService,
              public currenciesService: CurrenciesService,
              public translateService: TranslateService,
              public activatedRoute: ActivatedRoute,
              private platformDetectorService: PlatformDetectorService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public promoCodesService: PromoCodesService,
              public preloaderService: PreloaderService,
              public authGuard: AuthGuard) {

    this.groupPaymentMethods = SystemConfig.groupPaymentMethods;

    this.activatedRoute.queryParams.subscribe(params => {
      this.moneyBonusId = params['moneyBonusId'];
      this.fsBonusId = params['fsBonusId'];

      if (this.fsBonusId) {
        this.fsBonusesService.saveSelectedBonusId(this.fsBonusId);
        this.moneyBonusesService.deleteSelectedBonus();
      }

      if (this.moneyBonusId) {
        this.moneyBonusesService.saveSelectedBonusId(this.moneyBonusId);
        this.fsBonusesService.deleteSelectedBonus();
      }

    });
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      currency: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      amount: ['', [Validators.required]],
      account: [''],
      expirationDateMonth: [''],
      expirationDateYear: [''],
      bonusAllowed: [SystemConfig.receiveBonus]
    });

    this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    this.moneyBonusesService.moneyBonusesUpdatedEvent.subscribe((data) => {
      this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    });

    this.fsBonuses = this.fsBonusesService.fsBonuses;
    this.fsBonusesService.fsBonusesUpdatedEvent.subscribe((data) => {
      this.fsBonuses = this.fsBonusesService.fsBonuses;
    });

    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.paymentsService.paymentDepositMethodsReceivedEvent.subscribe(() => {
      if (this.selectedCurrencyCode) {
        this.onChangeCurrency(this.selectedCurrencyCode);
      }
    });

    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.selectedCurrencyCode = this.playerService.currencyCode;
      this.onChangeCurrency(this.selectedCurrencyCode);
    });

    if (this.playerService.currencyCode) {
      this.selectedCurrencyCode = this.playerService.currencyCode;
      this.onChangeCurrency(this.selectedCurrencyCode);
    }

    this.promoCode = this.promoCodesService.promoCode;
    this.promoCodesService.promoCodesUpdatedEvent.subscribe(() => {
      this.promoCode = this.promoCodesService.promoCode;

      if (this.selectedPaymentMethod) {
        this.onChangeMethod(this.selectedPaymentMethod);
      }

      if (this.promoCode) {
        this.tab = 'promo';
      }
    });

    if (this.promoCode) {
      this.tab = 'promo';
    }

    this.fsBonus = this.fsBonusesService.selectedBonus;
    this.fsBonusesService.selectedBonusUpdatedEvent.subscribe(() => {
      this.fsBonus = this.fsBonusesService.selectedBonus;
      if (this.selectedPaymentMethod) {
        this.onChangeMethod(this.selectedPaymentMethod);
      }
    });

    this.moneyBonus = this.moneyBonusesService.selectedBonus;
    this.moneyBonusesService.selectedBonusUpdatedEvent.subscribe(() => {
      this.moneyBonus = this.moneyBonusesService.selectedBonus;
      if (this.selectedPaymentMethod) {
        this.onChangeMethod(this.selectedPaymentMethod);
      }
    });

    this.activeMoneyBonus = this.playerMoneyBonusesService.activeBonus;
    this.playerMoneyBonusesService.activePlayerMoneyBonusReceivedEvent.subscribe(() => {
      this.activeMoneyBonus = this.playerMoneyBonusesService.activeBonus;
    });

    if (!this.simplified) {
      this.limitServices = 1000;
    }

    this.cdnServer = DomainsConfig.cdnServer;
  }

  slickInit(e: any) {
    if (this.platformDetectorService.platform === 'mobile') {
      e.slick.unslick();
    }

    let count = 0;
    if (this.moneyBonus && this.moneyBonusId) {
      count += 1;
    }
    if (this.fsBonus && this.fsBonusId) {
      count += 1;
    }
    count += this.moneyBonuses.length;
    count += this.fsBonuses.length;

    if (count < 4) {
      this.isUnslickSlider = true;
      e.slick.unslick();
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  onChangeCurrency(currencyCode: any) {

    if (!this.paymentsService.depositMethods) {
      return;
    }

    delete this.lastSuccessDepositMethod;
    this.selectedCurrencyCode = currencyCode;
    this.paymentMethodsFiltered = this.paymentsService.depositMethods.filter((method: any) => method.currency_code === currencyCode);

    const serviceGroupsSorted = [];
    for (const item of this.paymentMethodsFiltered) {
      serviceGroupsSorted[item['service_group_sort_index']] = item['service_group_name'];

      if (item['last_success']) {
        this.lastSuccessDepositMethod = item;
      }
    }

    const serviceGroups = [];
    for (const item of serviceGroupsSorted) {
      if (item) {
        serviceGroups.push(item);
      }
    }

    this.serviceGroups = serviceGroups;

    switch (currencyCode) {
      case 'RUB':
        this.amounts = this.amountsRUB;
        break;
      case 'UAH':
        this.amounts = this.amountsUAH;
        break;
      case 'USD':
        this.amounts = this.amountsUSD;
        break;
      case 'EUR':
        this.amounts = this.amountsEUR;
        break;
      case 'PLN':
        this.amounts = this.amountsPLN;
        break;
      case 'UZS':
        this.amounts = this.amountsUZS;
        break;
    }

    this.selectedPaymentMethod = '';

    this.formGroup.patchValue({
      paymentMethod: '',
    });

    this.formGroup.patchValue({
      currency: currencyCode,
    });

    /*
    if (this.groupPaymentMethods &&
      (!this.lastSuccessDepositMethod ||
        (this.lastSuccessDepositMethod.currency_code !== this.selectedCurrencyCode))
    ) {
      this.selectGroup('cards');
    }
    */

    if (this.groupPaymentMethods) {
      this.selectGroup('cards');
    }

    if (this.lastSuccessDepositMethod &&
      (this.lastSuccessDepositMethod.currency_code === this.selectedCurrencyCode)) {
      this.isLastSuccessGroupSelected = true;
    }

    if (this.lastSuccessDepositMethod) {
      this.onChangeMethod(this.lastSuccessDepositMethod);
    }
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

    let limitMinimum = paymentMethod.limit_minimum;

    if (this.moneyBonus || this.fsBonus) {

      if (this.moneyBonus) {
        const minDepositAmounts = this.moneyBonusesService.getBonusConditionValue(this.moneyBonus, 'minimum_deposit_amount');
        if (minDepositAmounts) {
          const minDepositAmount = minDepositAmounts[paymentMethod.currency_code];
          if (minDepositAmount && minDepositAmount > limitMinimum) {
            limitMinimum = minDepositAmount;
          }
        }
      }

      if (this.fsBonus) {
        const minDepositAmounts = this.fsBonusesService.getBonusConditionValue(this.fsBonus, 'minimum_deposit_amount');
        if (minDepositAmounts) {
          const minDepositAmount = minDepositAmounts[paymentMethod.currency_code];
          if (minDepositAmount && minDepositAmount > limitMinimum) {
            limitMinimum = minDepositAmount;
          }
        }
      }

    } else {

      if (this.promoCode) {

        if (this.promoCode.money_bonus) {
          const minDepositAmounts = this.moneyBonusesService.getBonusConditionValue(this.promoCode.money_bonus, 'minimum_deposit_amount');
          if (minDepositAmounts) {
            const minDepositAmount = minDepositAmounts[paymentMethod.currency_code];
            if (minDepositAmount && minDepositAmount > limitMinimum) {
              limitMinimum = minDepositAmount;
            }
          }
        }

        if (this.promoCode.fs_bonus) {
          const minDepositAmounts = this.fsBonusesService.getBonusConditionValue(this.promoCode.fs_bonus, 'minimum_deposit_amount');
          if (minDepositAmounts) {
            const minDepositAmount = minDepositAmounts[paymentMethod.currency_code];
            if (minDepositAmount && minDepositAmount > limitMinimum) {
              limitMinimum = minDepositAmount;
            }
          }
        }
      }
    }

    // if (!this.f.amount.value) {
    //   this.f['amount'].setValue(limitMinimum);
    // }

    this.f['amount'].setValue(limitMinimum);

    this.f['amount'].setValidators([
      Validators.required,
      Validators.min(limitMinimum),
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

    this.limitMinimum = limitMinimum;

    this.formGroup.patchValue({
      paymentMethod: paymentMethod.id,
    });
  }

  onChangeAmountInput(amount: any) {
    if (amount !== this.selectedAmount) {
      this.selectedAmount = '';
    }
  }

  onChangeAmountButtons(amount: any) {
    if (amount === this.selectedAmount) {
      this.selectedAmount = '';

      this.formGroup.patchValue({
        amount: '',
      });

      return;
    }

    this.selectedAmount = amount;

    this.formGroup.patchValue({
      amount: amount,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    let moneyBonusId = null;
    if (this.moneyBonus) {
      moneyBonusId = this.moneyBonus.id;
    }

    let fsBonusId = null;
    if (this.fsBonus) {
      fsBonusId = this.fsBonus.id;
    }

    this.preloaderService.show();
    this.loading = true;

    this.paymentsDataSource.deposit(
      this.selectedPaymentMethod.id,
      this.f.amount.value,
      this.f.account.value,
      this.f.expirationDateMonth.value,
      this.f.expirationDateYear.value,
      this.f.bonusAllowed.value,
      moneyBonusId,
      fsBonusId,
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.preloaderService.hide();
          this.loading = false;
          this.errors = '';

          if (data.fieldsRequired) {
            this.translateService.get('modal.complete_profile_to_continue').subscribe((text: string) => {
              this.showModalService.openModalProfileInfo(data.fieldsRequired, text);
            });
          } else {

            if (data.schemeName === 'redirect') {

              if (data.iframe) {
                this.showModalService.openModalPayment(data.url, data.commissionAmount, data.commissionCurrency);
              } else {
                this.showModalService.openModalPaymentRedirect(data.url, data.commissionAmount, data.commissionCurrency);
              }

            } else if (data.schemeName === 'host_to_host') {

              if (data.serviceName === 'p2p') {
                this.showModalService.openModalPaymentPointToPoint(
                  data.id, data.amount, data.currency, data.bank, data.card, data.recipient
                );
              } else if (data.serviceName === 'fps') {
                this.showModalService.openModalPaymentFps(
                  data.id, data.amount, data.currency, data.bank, data.phoneNumber, data.recipient
                );
              }
            }
          }

          this.successEvent.emit();
        },
        error => {
          this.preloaderService.hide();
          this.errors = error;
          this.loading = false;
        });
  }

  selectGroupLastSuccessDeposit() {
    this.isLastSuccessGroupSelected = true;
  }

  selectGroup(serviceGroup: any) {
    this.isLastSuccessGroupSelected = false;
    this.selectedServiceGroup = serviceGroup;

    this.paymentMethodsFilteredByServiceGroup = this.paymentMethodsFiltered.filter((method: any) => method.service_group_name === serviceGroup);
  }

  selectTab(tab: string) {
    this.tab = tab;
  }

  selectMoneyBonus(bonusId: any) {
    delete this.moneyBonusId;
    this.moneyBonusesService.saveSelectedBonusId(bonusId);
    this.fsBonusesService.deleteSelectedBonus();
  }

  cancelMoneyBonus() {
    // delete this.moneyBonusId;
    delete this.moneyBonus;
    this.moneyBonusesService.deleteSelectedBonus();
  }

  selectFsBonus(bonusId: any) {
    delete this.fsBonusId;
    this.fsBonusesService.saveSelectedBonusId(bonusId);
    this.moneyBonusesService.deleteSelectedBonus();
  }

  cancelFsBonus() {
    // delete this.fsBonusId;
    delete this.fsBonus;
    this.fsBonusesService.deleteSelectedBonus();
  }

  onChangeBonusAllowed() {

    if (!this.f.bonusAllowed.value) {
      delete this.promoCode;
      this.cancelMoneyBonus();
      this.cancelFsBonus();
    }
  }

  getAccountPlaceholder(selectedPaymentMethod: any) {
    return this.paymentsService.getAccountPlaceholder(selectedPaymentMethod);
  }

  cancelPromoCode(promoCodeId: any) {
    this.promoCodesService.cancelPromoCode(promoCodeId);
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

  hasOneBonus() {
    let count = 0;

    if (this.moneyBonus && this.moneyBonusId) {
      count += 1;
    }

    if (this.fsBonus && this.fsBonusId) {
      count += 1;
    }

    if (this.moneyBonuses) {
      count += this.moneyBonuses.length;
    }

    if (this.fsBonuses) {
      count += this.fsBonuses.length;
    }

    return count === 1;
  }

  checkAllowedBonus(bonus: any) {
    if (this.authGuard.isAuthorized()) {

      for (const condition of bonus.bonus_conditions) {

        if (condition.name === 'in_groups') {
          let isBonusAllowed = false;
          const groups = Helper.stringToJSON(condition.value);
          for (const groupId of groups) {
            if (this.playerService.isIdInPlayerGroups(Number(groupId))) {
              isBonusAllowed = true;
              break;
            }
          }
          this.isBonusAllowed = isBonusAllowed;
        } else {
          this.isBonusAllowed = true;
        }
      }

      return this.isBonusAllowed;
      
    } else {
      return true;
    }
  }

}
