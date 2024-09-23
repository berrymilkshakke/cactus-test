import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PhoneCodesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getCodes() {
    return this.http.get<any>(`${DomainsConfig.domain}/phone-codes-public/get-codes`);
  }

}
