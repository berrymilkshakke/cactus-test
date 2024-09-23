import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class DateTimePublicDataSource {

  constructor(public http: HttpClient) {
  }

  getDateTime() {
    return this.http.get<any>(`${DomainsConfig.domain}/date-time-public/get-date-time`);
  }

}
