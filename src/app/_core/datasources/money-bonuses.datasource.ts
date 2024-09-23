import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class MoneyBonusesDataSource {

  constructor(public http: HttpClient) {
  }

  getMoneyBonuses() {
    return this.http.get<any>(`${DomainsConfig.domain}/money-bonuses/get-money-bonuses`);
  }

}
