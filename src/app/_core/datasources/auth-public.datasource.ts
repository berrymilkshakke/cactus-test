import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class AuthPublicDataSource {

  constructor(public http: HttpClient) {
  }

  register(email: string,
           password: string,
           currency: string,
           subscription: boolean,
           language: string,
           linkCode: string,
           clickId: string,
           fingerprint: string,
           identifier: string
  ) {
    return this.http.post<any>(`${DomainsConfig.domain}/auth-public/register`,
      {email, password, currency, subscription, language, linkCode, clickId, fingerprint, identifier}
    );
  }

  login(email: string, password: string, fingerprint: string, identifier: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/auth-public/login`,
      {email, password, fingerprint, identifier});
  }

  confirm(token: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/auth-public/confirm`,
      {token});
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/auth-public/forgot-password`,
      {email});
  }

  changePassword(token: string, password: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/auth-public/change-password`,
      {token, password});
  }

}
