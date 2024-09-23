import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {PromoCodesService} from '../../_core/services/promo-codes.service';
import {PromoCodesDataSource} from '../../_core/datasources/promo-codes.datasource';


@Component({
  selector: 'app-form-promo-code',
  templateUrl: './form-promo-code.component.html',
  styleUrls: ['./form-promo-code.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormPromoCodeComponent implements OnInit {

  @Input() code: string = '';
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  constructor(public formBuilder: FormBuilder,
              public notifierService: NotifierService,
              public promoCodesDataSource: PromoCodesDataSource,
              public promoCodesService: PromoCodesService,
              public translateService: TranslateService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      code: [this.code, Validators.compose(
        [Validators.required, Validators.minLength(4)]
      )]
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
    this.promoCodesDataSource
      .sendPromoCode(this.f.code.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.translateService.get('promo_codes.sent').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.promoCodesService.getPromoCode();
          this.successEvent.emit();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

}

