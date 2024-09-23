import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class FsBonusesDataSource {

  constructor(public http: HttpClient) {
  }

  getFsBonuses() {
    return this.http.get<any>(`${DomainsConfig.domain}/fs-bonuses/get-fs-bonuses`);
  }

  activateBonus(bonusId: number) {
    return this.http.put<any>(`${DomainsConfig.domain}/fs-bonuses/activate-bonus/${bonusId}`, {});
  }
}
