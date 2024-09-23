import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {AffiliateDataSource} from '../../_core/datasources/affiliate.datasource';
import {PlayerService} from '../../_core/services/player.service';


@Component({
  selector: 'app-form-create-affiliate',
  templateUrl: './form-create-affiliate.component.html',
  styleUrls: ['./form-create-affiliate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCreateAffiliateComponent implements OnInit {

  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  constructor(public formBuilder: FormBuilder,
              public notifierService: NotifierService,
              public affiliateDataSource: AffiliateDataSource,
              public playerService: PlayerService,
              public translateService: TranslateService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      trafficSource: ['', Validators.compose(
        [Validators.required, Validators.minLength(5), Validators.maxLength(1024)]
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
    this.affiliateDataSource
      .addAffiliate(
        this.f.trafficSource.value
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.successEvent.emit();

          this.playerService.getPlayer();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

}

