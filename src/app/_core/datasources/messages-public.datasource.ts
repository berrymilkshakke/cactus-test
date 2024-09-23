import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class MessagesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  sendMessage(firstName: string, email: string, message: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/messages-public/send-message`,
      {firstName, email, message}
    );
  }

}
