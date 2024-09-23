import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {SystemConfig} from '../../_configs/system.conf';
import {TranslateService} from '@ngx-translate/core';
import {AuthPublicDataSource} from '../../_core/datasources/auth-public.datasource';


@Component({
  selector: 'app-form-set-password',
  templateUrl: './form-set-password.component.html',
  styleUrls: ['./form-set-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormSetPasswordComponent implements OnInit {

  @Input() token: string;
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  errors: string = '';

  constructor(public formBuilder: FormBuilder,
              public authPublicDataSource: AuthPublicDataSource,
              public notifierService: NotifierService,
              public showModalService: ShowModalService,
              public translateService: TranslateService) {

  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(SystemConfig.passwordMinLength)]
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
    this.authPublicDataSource.changePassword(this.token, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.translateService.get('auth.password_changed').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.showModalService.openModalLogin();
          this.successEvent.emit();
        },
        error => {
          this.errors = error;
          this.loading = false;
        });
  }

}
