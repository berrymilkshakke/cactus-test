import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class ComponentsDataSource {

  constructor(public http: HttpClient) {
  }

  getComponent(componentName: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/components/get-component/${componentName}`);
  }

  getComponentJson(componentName: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/components/get-component-json/${componentName}`);
  }

}
