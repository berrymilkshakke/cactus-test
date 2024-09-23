import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {SystemConfig} from '../../_configs/system.conf';


@Component({
  template: '',
})
export class PaymentStatusRedirectComponent implements OnInit {

  public status: string = '';
  public redirectPath: any = SystemConfig.depositPath;

  constructor(public showModalService: ShowModalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public authGuard: AuthGuard,
              public notifierService: NotifierService) {

    this.status = activatedRoute.snapshot.params['status'];
  }

  ngOnInit() {

    if (this.status === 'success') {

      this.router.navigate(['/']).then(() => {

        this.translateService.get('payments.status_success').subscribe((text: string) => {
          this.notifierService.notify('success', text);
        });

      });

    } else if (this.status === 'fail') {

      this.router.navigate([this.redirectPath]).then(() => {

        this.translateService.get('payments.status_fail').subscribe((text: string) => {
          this.notifierService.notify('error', text);
        });

      });

    } else {

      this.router.navigate(['/']).then(() => {
        //
      });

    }
  }


}
