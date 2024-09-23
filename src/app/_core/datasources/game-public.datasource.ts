import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GamePublicDataSource {

  constructor(public http: HttpClient) {
  }

  getDemoGameData(brandName: string, gameName: string, platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/game-public/get-demo-game-data/${brandName}/${gameName}/${platform}`);
  }

}
