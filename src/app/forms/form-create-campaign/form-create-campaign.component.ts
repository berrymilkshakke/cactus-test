import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {AffiliateDataSource} from '../../_core/datasources/affiliate.datasource';
import {AffiliateTariffsDataSource} from '../../_core/datasources/affiliate-tariffs.datasource';
import {AffiliateService} from '../../_core/services/affiliates.service';
import {CurrenciesService} from '../../_core/services/currencies.service';


@Component({
  selector: 'app-form-create-campaign',
  templateUrl: './form-create-campaign.component.html',
  styleUrls: ['./form-create-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCreateCampaignComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  public tariffs: any;
  public selectedTariff: string;

  public currencies: any;
  public selectedCurrencyCode: string;

  constructor(public formBuilder: FormBuilder,
              public notifierService: NotifierService,
              public affiliateDataSource: AffiliateDataSource,
              public affiliateService: AffiliateService,
              public translateService: TranslateService,
              public currenciesService: CurrenciesService,
              public affiliateTariffsDataSource: AffiliateTariffsDataSource) {
  }

  ngOnInit() {
    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.formGroup = this.formBuilder.group({
      tariffId: ['', Validators.required],
      title: ['', Validators.compose(
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
      )],
      currencyCode: ['', Validators.required],
    });

    this.getTariffs();
  }

  getTariffs() {
    this.affiliateTariffsDataSource.getTariffs()
      .pipe(first())
      .subscribe((data: any) => {
        this.tariffs = data;
      });
  }

  onChangeTariff(tariff: any) {
    this.selectedTariff = tariff;
    this.formGroup.patchValue({
      tariffId: tariff.id,
    });
  }

  onChangeCurrency(currencyCode: any) {
    this.selectedCurrencyCode = currencyCode;
    this.formGroup.patchValue({
      currencyCode: currencyCode,
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

    this.loading = true;
    this.affiliateDataSource
      .createCampaign(
        this.f.tariffId.value,
        this.f.title.value,
        this.f.currencyCode.value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.successEvent.emit();
          this.affiliateService.affiliateCampaignsUpdatedEvent.emit();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

  closeModal() {
    this.successEvent.emit();
  }
}

