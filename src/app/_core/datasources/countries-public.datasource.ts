import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class CountriesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getCountries() {
    return this.http.get<any>(`${DomainsConfig.domain}/countries-public/get-countries`);
  }

}
