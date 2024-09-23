import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {first} from 'rxjs/operators';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {SystemConfig} from '../../_configs/system.conf';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormLoginComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              public showModalService: ShowModalService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.compose(
        [Validators.required, Validators.email]
      )],
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(SystemConfig.passwordMinLength)]
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
    this.authenticationService
      .login(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.successEvent.emit();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

}

