import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class BanksPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getBanks(currencyCode: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/banks-public/get-banks/${currencyCode}`);
  }

}
