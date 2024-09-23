import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class SubscriptionsPublicDataSource {

  constructor(public http: HttpClient) {
  }

  unsubscribe(groupId: string, login: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/subscriptions-public/unsubscribe`, {groupId, login});
  }

}
