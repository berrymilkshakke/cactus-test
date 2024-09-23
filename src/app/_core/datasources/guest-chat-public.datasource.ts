import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GuestChatPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getMessages(guestId: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/guest-chat-public/get-messages/${guestId}`);
  }

  sendMessage(guestId: string, message: string, questionId: number) {
    return this.http.post<any>(`${DomainsConfig.domain}/guest-chat-public/send-message/${guestId}`,
      {message, questionId}
    );
  }

  setReadStatus(guestId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/guest-chat-public/set-read-status/${guestId}`, {});
  }

}
