import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {PromoCodesDataSource} from '../datasources/promo-codes.datasource';
import {AuthenticationService} from './authentication.service';
import {AuthGuard} from '../guards/auth.guard';


@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {

  public cookieName = 'promoCode';
  public promoCode: string;

  @Output() public promoCodesUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public authGuard: AuthGuard,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public promoCodesDataSource: PromoCodesDataSource,
              public authenticationService: AuthenticationService) {

    authenticationService.authorizationEvent.subscribe(() => {

      const promoCode = localStorage.getItem(this.cookieName);

      if (promoCode) {
        this.sendPromoCode(promoCode);
      }
    });

    if (authGuard.isAuthorized()) {
      this.getPromoCode();
    }
  }

  getPromoCode() {
    this.promoCodesDataSource.getPromoCode()
      .pipe(first())
      .subscribe(
        data => {
          if (data['id']) {
            this.promoCode = data;
            this.promoCodesUpdatedEvent.emit();
          }
        });
  }

  saveCode(promoCode: string) {
    localStorage.setItem(this.cookieName, promoCode);
  }

  sendPromoCode(promoCode: string) {
    this.promoCodesDataSource
      .sendPromoCode(promoCode)
      .pipe(first())
      .subscribe(
        data => {
          this.translateService.get('promo_codes.sent').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          localStorage.removeItem(this.cookieName);
          this.getPromoCode();

        }, error => {
          localStorage.removeItem(this.cookieName);
        });
  }

  cancelPromoCode(codeId: string) {
    this.promoCodesDataSource.cancelPromoCode(codeId)
      .pipe(first())
      .subscribe(
        data => {
          delete (this.promoCode);
          this.promoCodesUpdatedEvent.emit();
        },
        error => {
          //
        });
  }
}
