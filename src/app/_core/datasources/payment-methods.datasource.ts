import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PaymentMethodsDataSource {

  constructor(public http: HttpClient) {
  }

  getDepositMethods() {
    return this.http.get<any>(`${DomainsConfig.domain}/payment-methods/get-deposit-methods`);
  }

  getWithdrawalMethods() {
    return this.http.get<any>(`${DomainsConfig.domain}/payment-methods/get-withdrawal-methods`);
  }

}
