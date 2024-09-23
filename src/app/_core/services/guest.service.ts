import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthGuard} from '../guards/auth.guard';
import {IdentificationService} from './identification.service';
import {AuthenticationService} from './authentication.service';
import {LanguagesService} from './languages.service';
import {TranslateService} from '@ngx-translate/core';
import {GuestPublicDataSource} from '../datasources/guest-public.datasource';
import {SystemConfig} from '../../_configs/system.conf';


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public cookieName = 'guestId';

  public guest: any;
  public guestId: string;
  public currencyCode: string;

  @Output() public guestDataReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public guestLocaleUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public guestPublicDataSource: GuestPublicDataSource,
              public authGuard: AuthGuard,
              public identificationService: IdentificationService,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public languagesService: LanguagesService) {

    authenticationService.logoutEvent.subscribe(() => {
      this.getGuestInfo();
    });

    languagesService.languageChangedEvent.subscribe((languageCode: string) => {
      if (!authGuard.isAuthorized() && this.guestId) {
        this.setGuestLocale(this.guestId, languageCode);
      }
    });

    this.guestDataReceivedEvent.subscribe(() => {
      const currentLanguage = languagesService.currentLanguage;
      if (currentLanguage && (this.guest.locale_code !== currentLanguage.code)) {
        languagesService.setLanguage(currentLanguage);
      }
    });

    if (!authGuard.isAuthorized()) {
      this.getGuestInfo();
    }
  }

  getGuestInfo() {
    const cookieGuestId = localStorage.getItem(this.cookieName);

    this.guestPublicDataSource.getGuestDetails(
      cookieGuestId,
      this.languagesService.getCurrentLanguage(),
      this.identificationService.fingerprint,
      this.identificationService.getIdentifier()
    )
      .pipe(first())
      .subscribe(
        data => {
          const guestId = data['id'];

          this.guest = data;
          this.guestId = guestId;
          this.currencyCode = data['currency_code'];

          this.guestDataReceivedEvent.emit();

          localStorage.setItem(this.cookieName, guestId);
        });
  }

  setGuestLocale(guestId: string, localeCode: string) {
    this.guestPublicDataSource.setGuestLocale(guestId, localeCode)
      .pipe(first())
      .subscribe(
        data => {
          this.guestLocaleUpdatedEvent.emit();
        });
  }
}
