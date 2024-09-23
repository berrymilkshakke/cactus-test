import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class TimeZonesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getTimeZones() {
    return this.http.get<any>(`${DomainsConfig.domain}/time-zones-public/get-time-zones`);
  }

}
