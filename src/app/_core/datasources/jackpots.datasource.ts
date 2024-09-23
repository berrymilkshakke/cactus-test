import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class JackpotsDataSource {

  constructor(public http: HttpClient) {
  }

  getJackpotsActive() {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots/get-jackpots-active`);
  }

  getJackpotsFinished() {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots/get-jackpots-finished`);
  }

  getJackpot(jackpotId: number) {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots/get-jackpot/${jackpotId}`);
  }

}
