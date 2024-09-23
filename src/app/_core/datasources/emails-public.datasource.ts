import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class EmailPublicDataSource {

  constructor(public http: HttpClient) {
  }

  setClicked(emailUuid: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/emails-public/set-clicked/${emailUuid}`, {});
  }

}
