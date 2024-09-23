import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GamesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getGames(platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/games-public/get-games/${platform}`);
  }

  getBrands(platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/games-public/get-brands/${platform}`);
  }

  getCategories(platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/games-public/get-categories/${platform}`);
  }

}
