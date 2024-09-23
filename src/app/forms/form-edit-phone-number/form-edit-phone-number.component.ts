import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateParserFormatter} from '../../_core/classes/custom-date-parser-formatter';
import {PlayerService} from '../../_core/services/player.service';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {LanguagesService} from '../../_core/services/languages.service';
import {SystemConfig} from '../../_configs/system.conf';
import {PhoneCodesService} from '../../_core/services/phone-codes.service';


@Component({
  selector: 'app-form-edit-phone-number',
  templateUrl: './form-edit-phone-number.component.html',
  styleUrls: ['./form-edit-phone-number.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FormEditPhoneNumberComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  public selectedPhoneCode: any;
  public numberSaved: boolean = false;
  public numberAllowed: boolean = false;
  public numberConfirmed: boolean = true;
  public confirmationInitialized: boolean = false;

  constructor(public formBuilder: FormBuilder,
              public playerDataSource: PlayerDataSource,
              public playerService: PlayerService,
              public translateService: TranslateService,
              public languagesService: LanguagesService,
              public phoneCodesService: PhoneCodesService,
              public notifierService: NotifierService) {
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      phoneCodeId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(SystemConfig.phoneNumberRegex)]],
      code: [''],
    });

    this.getPlayerPhone();
  }

  getPhoneCodes() {
    return this.phoneCodesService.phoneCodes;
  }

  onChangePhoneCode(phoneCode: any) {
    this.selectedPhoneCode = phoneCode;

    this.formGroup.patchValue({
      phoneCodeId: phoneCode.id,
    });
  }

  getPlayerPhone() {
    this.playerDataSource.getPlayerPhone()
      .pipe(first())
      .subscribe((data: any) => {
        // this.data = data;

        if (data.number) {
          this.f['phoneCodeId'].setValue(data.code_id);
          const phoneCode = this.phoneCodesService.getCodeById(data.code_id);
          this.onChangePhoneCode(phoneCode);
          this.f['phoneCodeId'].disable();

          this.formGroup.get('phoneNumber').setValue(data.number);
          this.numberSaved = true;
          this.f['phoneNumber'].disable();
        }

        this.numberConfirmed = data.confirmed;
        this.numberAllowed = data.allowed;

      });
  }

  get f() {
    return this.formGroup.controls;
  }

  saveNumber() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.playerDataSource
      .postPlayerPhone(
        this.f.phoneCodeId.value,
        this.f.phoneNumber.value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.getPlayerPhone();

          this.successEvent.emit();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

  initConfirmationNumber() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.playerDataSource
      .initConfirmationPlayerPhone(
        this.f.phoneCodeId.value,
        this.f.phoneNumber.value,
        this.f.code.value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.confirmationInitialized = true;
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;

          this.confirmationInitialized = true;
        });
  }

  confirmNumber() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.playerDataSource
      .confirmPlayerPhone(
        this.f.phoneCodeId.value,
        this.f.phoneNumber.value,
        this.f.code.value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.confirmationInitialized = false;
          this.numberConfirmed = true;

          this.translateService.get('notifications.number_confirmed').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.successEvent.emit();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }
}

