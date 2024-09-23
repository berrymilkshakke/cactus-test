import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PlayerFieldSettingsDataSource {

  constructor(private http: HttpClient) {
  }

  getSettings() {
    return this.http.get<any>(`${DomainsConfig.domain}/player-field-settings/get-settings`);
  }

}
