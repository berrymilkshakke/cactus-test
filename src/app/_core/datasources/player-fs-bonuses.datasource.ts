import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PlayerFsBonusesDataSource {

  constructor(public http: HttpClient) {
  }

  getFsBonuses() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-fs-bonuses/get-fs-bonuses`);
  }

  getFsBonusesHistory() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-fs-bonuses/get-fs-bonuses-history`);
  }

  activatePlayerFsBonus(bonusId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player-fs-bonuses/activate-fs-bonus/${bonusId}`, {});
  }

  cancelPlayerFsBonus(bonusId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player-fs-bonuses/cancel-fs-bonus/${bonusId}`, {});
  }

}
