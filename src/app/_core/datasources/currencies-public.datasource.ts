import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class CurrenciesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getCurrencies() {
    return this.http.get<any>(`${DomainsConfig.domain}/currencies-public/get-currencies`);
  }

}
