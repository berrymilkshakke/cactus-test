import {Injectable, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SystemConfig} from '../../_configs/system.conf';


@Injectable({
  providedIn: 'root'
})
export class CookiesPolicyService {

  public cookieName = 'cookiesAccepted';

  constructor(public cookieService: CookieService) {
  }

  isAccepted() {
    const cookieExists: boolean = this.cookieService.check(this.cookieName);

    if (SystemConfig.showCookiesNotification && !cookieExists) {
      return false;
    }

    return true;
  }

  onAccept() {
    this.cookieService.set(this.cookieName, 'true', 36500, '/', '', false, 'Lax');
  }
}
