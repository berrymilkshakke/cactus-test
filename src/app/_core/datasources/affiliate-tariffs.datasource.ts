import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class AffiliateTariffsDataSource {

  constructor(public http: HttpClient) {
  }

  getTariffs() {
    return this.http.get<any>(`${DomainsConfig.domain}/affiliate-tariffs/get-tariffs`);
  }

}
