import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class AuthDataSource {

  constructor(public http: HttpClient) {
  }

  logout(fingerprint: string, identifier: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/auth/logout`,
      {fingerprint, identifier});
  }

}
