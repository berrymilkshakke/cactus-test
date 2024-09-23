import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {CountriesService} from '../../_core/services/countries.service';
import {TimeZonesService} from '../../_core/services/time-zones.service';
import {NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateParserFormatter} from '../../_core/classes/custom-date-parser-formatter';
import {Helper} from '../../_core/classes/helper';
import {PlayerService} from '../../_core/services/player.service';
import {Player} from '../../_core/models/player';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';
import {PlayerFieldSettingsDataSource} from '../../_core/datasources/player-field-settings.datasource';
import {LanguagesService} from '../../_core/services/languages.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {SystemConfig} from '../../_configs/system.conf';
import {PhoneCodesService} from '../../_core/services/phone-codes.service';


@Component({
  selector: 'app-form-edit-player-info',
  templateUrl: './form-edit-player-info.component.html',
  styleUrls: ['./form-edit-player-info.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FormEditPlayerInfoComponent implements OnInit {

  @Input() forModal: boolean = false;
  @Input() fieldsRequired: any;
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  public selectedPhoneCode: string;
  public selectedCountry: string;
  public selectedTimeZone: any;

  public player: Player;
  public fieldSettings: any;

  public showConfirmation: boolean;

  constructor(public formBuilder: FormBuilder,
              public countriesService: CountriesService,
              public timeZonesService: TimeZonesService,
              public playerDataSource: PlayerDataSource,
              public playerService: PlayerService,
              public languagesService: LanguagesService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public phoneCodesService: PhoneCodesService,
              public playerFieldSettingsDataSource: PlayerFieldSettingsDataSource) {
  }

  ngOnInit() {

    this.playerService.playerDataReceivedEvent.subscribe(() => {
      this.setFieldSettings();
    });

    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      firstName: [null],
      middleName: [null],
      lastName: [null],
      dateOfBirth: [null],
      gender: [null],
      phoneCodeId: [null],
      phoneNumber: [null, [Validators.pattern(SystemConfig.phoneNumberRegex)]],
      countryCode: [null],
      region: [null],
      city: [null],
      address: [null],
      postalCode: [null],
      timeZoneId: [null],
      refuseBonuses: [false],
      newsletter: [false],
    });

    this.getSettings();
  }

  getFormName(elementName: string) {
    if (elementName === 'first_name') {
      return 'firstName';
    } else if (elementName === 'middle_name') {
      return 'middleName';
    } else if (elementName === 'last_name') {
      return 'lastName';
    } else if (elementName === 'date_of_birth') {
      return 'dateOfBirth';
    } else if (elementName === 'country_code') {
      return 'countryCode';
    } else if (elementName === 'postal_code') {
      return 'postalCode';
    } else if (elementName === 'time_zone_id') {
      return 'timeZoneId';
    } else if (elementName === 'refuse_bonuses') {
      return 'refuseBonuses';
    } else if (elementName === 'phone_number') {
      return 'phoneNumber';
    }

    return elementName;
  }

  setFieldSettings() {
    if (!this.fieldSettings) {
      return;
    }

    this.formGroup.disable();

    const fieldSettings = this.fieldSettings;

    for (const element of fieldSettings) {

      const formName = this.getFormName(element.name);

      if (!this.player[element.name] || element.editable) {

        if (this.f[formName]) {
          this.f[formName].enable();
        }
      }

      if (this.fieldsRequired) {
        if (this.fieldsRequired.includes(element.name)) {
          this.f[formName].setValidators([Validators.required]);
          this.f[formName].updateValueAndValidity();
        }
      } else if (element.required) {
        this.f[formName].setValidators([Validators.required]);
        this.f[formName].updateValueAndValidity();
      }
    }

    this.f['phoneCodeId'].enable();
    this.f['newsletter'].enable();

    if (!this.playerService.player.email_confirmed) {
      this.f['email'].enable();
    }
  }

  checkShowField(fieldName: string) {
    if (!this.fieldsRequired) {

      if (fieldName === 'postal_code') {
        return false;
      }

      return true;
    }

    if (this.fieldsRequired.includes(fieldName)) {
      return true;
    }

    return false;
  }

  getCountries() {
    return this.countriesService.countries;
  }

  onChangeCountry(country: any) {
    this.selectedCountry = country.code;

    this.formGroup.patchValue({
      countryCode: country.code,
    });
  }

  onChangeTimeZone(timeZone: any) {
    this.selectedTimeZone = timeZone.description;

    this.formGroup.patchValue({
      timeZoneId: timeZone.id,
    });
  }

  getPlayer() {
    return this.playerService.player;
  }

  isEmailConfirmed() {
    return this.playerService.player.email_confirmed;
  }

  confirmPhone() {
    //
  }

  cancelConfirmation() {
    //
  }

  closeModal() {
    this.successEvent.emit();
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

  getSettings() {
    this.playerFieldSettingsDataSource.getSettings()
      .pipe(first())
      .subscribe((data: any) => {
        this.fieldSettings = data;

        this.getPlayerInfo();
      });
  }

  getPlayerInfo() {
    this.playerDataSource.getPlayerInfo()
      .pipe(first())
      .subscribe(player => {
        this.player = <Player>player;

        this.formGroup.get('email').setValue(player.email);
        this.formGroup.get('firstName').setValue(player.first_name);
        this.formGroup.get('middleName').setValue(player.middle_name);
        this.formGroup.get('lastName').setValue(player.last_name);
        this.formGroup.get('gender').setValue(player.gender);

        this.formGroup.get('region').setValue(player.region);
        this.formGroup.get('city').setValue(player.city);
        this.formGroup.get('address').setValue(player.address);

        this.formGroup.get('postalCode').setValue(player.postal_code);

        this.formGroup.get('refuseBonuses').setValue(player.refuse_bonuses);

        if (player.phone_code_id) {
          const phoneCode = this.phoneCodesService.getCodeById(player.phone_code_id);
          this.onChangePhoneCode(phoneCode);

          this.formGroup.get('phoneCodeId').setValue(player.phone_code_id);
          this.formGroup.get('phoneNumber').setValue(player.phone_number);
        }

        if (player.country_code) {
          const country = this.countriesService.getCountryByCode(player.country_code);
          if (country) {
            this.onChangeCountry(country);
          }
        }

        if (player.time_zone_id) {
          const timeZone = this.timeZonesService.getTimeZoneById(Number(player.time_zone_id));
          if (timeZone) {
            this.onChangeTimeZone(timeZone);
          }
        }

        if (player.date_of_birth) {
          const dateArr = player.date_of_birth.split('-').map(Number);
          const ngbDate = new NgbDate(dateArr[0], dateArr[1], dateArr[2]);
          this.formGroup.get('dateOfBirth').setValue(ngbDate);
        }

        this.formGroup.get('newsletter').setValue(player.newsletter);

        if (this.fieldSettings) {
          this.setFieldSettings();
        }
      });
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      console.log(this.formGroup);
      return;
    }

    let dateOfBirth = this.f.dateOfBirth.value;
    if (dateOfBirth) {
      dateOfBirth = Helper.dateToString(dateOfBirth);
    }

    this.loading = true;
    this.playerDataSource
      .editPlayerInfo(
        this.f.email.value,
        this.f.firstName.value,
        this.f.middleName.value,
        this.f.lastName.value,
        dateOfBirth,
        this.f.gender.value,
        this.f.phoneCodeId.value,
        this.f.phoneNumber.value,
        this.f.countryCode.value,
        this.f.region.value,
        this.f.city.value,
        this.f.address.value,
        this.f.postalCode.value,
        this.f.timeZoneId.value,
        this.f.refuseBonuses.value,
        this.f.newsletter.value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.successEvent.emit();
          this.playerService.playerProfileChangedEvent.emit();

          this.translateService.get('notifications.data_saved').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }
}
