import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class FsBonusesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getFsBonuses() {
    return this.http.get<any>(`${DomainsConfig.domain}/fs-bonuses-public/get-fs-bonuses`);
  }

}
