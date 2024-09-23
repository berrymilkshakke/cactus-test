import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PlayerMoneyBonusesDataSource {

  constructor(public http: HttpClient) {
  }

  getMoneyBonuses() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-money-bonuses/get-money-bonuses`);
  }

  getMoneyBonus(bonusId: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/player-money-bonuses/get-money-bonus/${bonusId}`);
  }

  getActiveMoneyBonus() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-money-bonuses/get-active-money-bonus`);
  }

  getMoneyBonusesHistory() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-money-bonuses/get-money-bonuses-history`);
  }

  activateMoneyBonus(bonusId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player-money-bonuses/activate-money-bonus/${bonusId}`, {});
  }

  cancelMoneyBonus(bonusId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player-money-bonuses/cancel-money-bonus/${bonusId}`, {});
  }

}
