import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {PromoCodesService} from '../../_core/services/promo-codes.service';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  template: '',
})
export class ActivationPromoCodeRedirectComponent implements OnInit {

  public promoCode: string = '';
  public path: string = '/';

  constructor(public showModalService: ShowModalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public authGuard: AuthGuard,
              public notifierService: NotifierService,
              public promoCodesService: PromoCodesService) {

    this.promoCode = activatedRoute.snapshot.params['promoCode'];

    this.activatedRoute.queryParams.subscribe((params: any) => {
      const path = params['path'];

      if (path) {
        this.path = path;
      }
    });
  }

  ngOnInit() {

    this.router.navigate([this.path]).then(() => {

      setTimeout(() => {

        if (this.authGuard.isAuthorized()) {
          this.promoCodesService.sendPromoCode(this.promoCode);
        } else {
          this.promoCodesService.saveCode(this.promoCode);
          // this.router.navigate(['login']);
        }

      }, 1 * 1000);

    });


  }


}
