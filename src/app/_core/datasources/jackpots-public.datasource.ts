import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class JackpotsPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getJackpotsActive() {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots-public/get-jackpots-active`);
  }

  getJackpotsFinished() {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots-public/get-jackpots-finished`);
  }

  getJackpot(jackpotId: number) {
    return this.http.get<any>(`${DomainsConfig.domain}/jackpots-public/get-jackpot/${jackpotId}`);
  }

}
