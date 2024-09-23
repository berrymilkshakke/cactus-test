import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {SystemConfig} from '../../_configs/system.conf';
import {TranslateService} from '@ngx-translate/core';
import {PlayerService} from '../../_core/services/player.service';
import {NotifierService} from 'angular-notifier';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';


@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html',
  styleUrls: ['./form-change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormChangePasswordComponent implements OnInit {

  @Input() playerId: string;
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  errors: string = '';

  constructor(public formBuilder: FormBuilder,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public playerDataSource: PlayerDataSource,
              public translateService: TranslateService,
              public playerService: PlayerService,
              public notifierService: NotifierService, ) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      currentPassword: ['', Validators.compose(
        [Validators.required, Validators.minLength(SystemConfig.passwordMinLength)]
      )],
      newPassword: ['', Validators.compose(
        [Validators.required, Validators.minLength(SystemConfig.passwordMinLength)]
      )],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  resetForm() {
    this.formGroup.reset({
      'currentPassword': '',
      'newPassword': '',
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.playerDataSource.changeCurrentPassword(
      this.f.currentPassword.value,
      this.f.newPassword.value
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          /*
          this.resetForm();

          this.formGroup.controls['currentPassword'].markAsPristine();
          this.formGroup.controls['currentPassword'].markAsUntouched();
          this.formGroup.controls['currentPassword'].updateValueAndValidity();

          this.formGroup.controls['newPassword'].markAsPristine();
          this.formGroup.controls['newPassword'].markAsUntouched();
          this.formGroup.controls['currentPassword'].updateValueAndValidity();
           */

          this.translateService.get('auth.password_changed').subscribe((text: string) => {
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
