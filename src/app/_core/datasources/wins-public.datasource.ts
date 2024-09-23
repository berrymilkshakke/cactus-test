import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class WinsPublicSource {

  constructor(public http: HttpClient) {
  }

  getRecentWins(platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/wins-public/get-recent-wins/${platform}`);
  }

  getRecentWinsByCurrency(platform: string, currencyCode: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/wins-public/get-recent-wins-by-currency/${platform}/${currencyCode}`);
  }

  getTopWins() {
    return this.http.get<any>(`${DomainsConfig.domain}/wins-public/get-top-wins`);
  }

}
