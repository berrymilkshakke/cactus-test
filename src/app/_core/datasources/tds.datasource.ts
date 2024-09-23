import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class TdsDataSource {

  httpOptions = {
    withCredentials: true
  };

  constructor(public http: HttpClient) {
  }

  getTds() {
    return this.http.get<any>(`${DomainsConfig.tdsUrl}/tds.php`, this.httpOptions);
  }

}
