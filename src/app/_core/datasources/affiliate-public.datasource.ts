import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class AffiliatePublicDataSource {

  constructor(public http: HttpClient) {
  }

  addLinkHistory(linkCode: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/affiliate-public/add-link-history/${linkCode}`, {});
  }

  sendAffiliateApplication(source: string, account: string, message: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate-public/send-affiliate-application`,
      {source, account, message}
    );
  }

}
