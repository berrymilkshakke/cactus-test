import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {CookieService} from 'ngx-cookie-service';
import {SystemConfig} from '../../_configs/system.conf';
import {first} from 'rxjs/operators';
import {AffiliatePublicDataSource} from '../../_core/datasources/affiliate-public.datasource';
import {PromoCodesService} from '../../_core/services/promo-codes.service';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  template: '',
})
export class SetAffiliateRedirectComponent implements OnInit {

  public linkCode: string;
  public path: string = '/';

  constructor(public showModalService: ShowModalService,
              public affiliatePublicDataSource: AffiliatePublicDataSource,
              public router: Router,
              public cookieService: CookieService,
              public promoCodesService: PromoCodesService,
              public authGuard: AuthGuard,
              public activatedRoute: ActivatedRoute) {

    this.linkCode = activatedRoute.snapshot.params['linkCode'];

    this.activatedRoute.queryParams.subscribe((params: any) => {

      const path = params['path'];

      if (path) {
        this.path = path;
      }

      const clickId = params['clickId'];

      if (clickId) {
        this.cookieService.set(
          SystemConfig.affiliateCookie.clickIdName,
          clickId,
          SystemConfig.affiliateCookie.expires,
          '/',
          '',
          false,
          'Lax'
        );
      }

      const promoCode = params['promoCode'];

      if (promoCode) {
        setTimeout(() => {

          if (this.authGuard.isAuthorized()) {
            this.promoCodesService.sendPromoCode(promoCode);
          } else {
            this.promoCodesService.saveCode(promoCode);
            // this.router.navigate(['login']);
          }

        }, 1 * 1000);
      }
    });

  }

  ngOnInit() {

    this.cookieService.set(
      SystemConfig.affiliateCookie.linkCodeName,
      this.linkCode,
      SystemConfig.affiliateCookie.expires,
      '/',
      '',
      false,
      'Lax'
    );

    this.router.navigate([this.path]).then(() => {

      this.affiliatePublicDataSource.addLinkHistory(this.linkCode)
        .pipe(first())
        .subscribe(
          (data: any) => {
            //
          });
    });

  }

}
