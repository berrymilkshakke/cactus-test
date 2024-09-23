import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GameDataSource {

  constructor(public http: HttpClient) {
  }

  getGameData(brandName: string, gameName: string, platform: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/game/get-game-data/${brandName}/${gameName}/${platform}`);
  }

}
