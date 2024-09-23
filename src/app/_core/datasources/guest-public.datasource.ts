import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GuestPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getGuestDetails(guestId: string, localeCode: string, fingerprint: string, identifier: string) {  // Todo
    if (guestId == null) {
      return this.http.post(`${DomainsConfig.domain}/guest-public/get-guest-details`,
        {localeCode, fingerprint, identifier}
      );
    } else {
      return this.http.post(`${DomainsConfig.domain}/guest-public/get-guest-details/${guestId}`,
        {localeCode, fingerprint, identifier}
      );
    }
  }

  setGuestLocale(guestId: string, localeCode: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/guest-public/set-guest-locale/${guestId}`, {localeCode});
  }

}
