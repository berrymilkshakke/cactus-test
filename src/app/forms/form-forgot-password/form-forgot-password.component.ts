import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';
import {AuthPublicDataSource} from '../../_core/datasources/auth-public.datasource';


@Component({
  selector: 'app-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormForgotPasswordComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  errors: string = '';

  constructor(public formBuilder: FormBuilder,
              public authPublicDataSource: AuthPublicDataSource,
              public playerDataSource: PlayerDataSource,
              public notifierService: NotifierService,
              public translateService: TranslateService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.compose(
        [Validators.required, Validators.email]
      )],
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
    this.authPublicDataSource.forgotPassword(this.f.login.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.translateService.get('auth.reset_letter_sent').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.successEvent.emit();
        },
        error => {
          this.errors = error;
          this.loading = false;
        });
  }

}
