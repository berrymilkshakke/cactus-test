import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PlayerChatDataSource {

  constructor(public http: HttpClient) {
  }

  getMessages() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-chat/get-messages`);
  }

  sendMessage(message: string, questionId: number) {
    return this.http.post<any>(`${DomainsConfig.domain}/player-chat/send-message`, {message, questionId});
  }

  uploadDocument(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('document', fileToUpload, fileToUpload.name);

    return this.http.post<any>(`${DomainsConfig.domain}/player-chat/upload-document`,
      formData,
    );
  }

  setReadStatus() {
    return this.http.put<any>(`${DomainsConfig.domain}/player-chat/set-read-status`, {});
  }

}
