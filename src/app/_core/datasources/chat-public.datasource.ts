import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class ChatPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getQuestions() {
    return this.http.get<any>(`${DomainsConfig.domain}/chat-public/get-questions`);
  }

}
