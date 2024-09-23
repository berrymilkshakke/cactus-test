import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PaymentMethodsPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getDepositMethods() {
    return this.http.get<any>(`${DomainsConfig.domain}/payment-methods-public/get-deposit-methods`);
  }

  getWithdrawalMethods() {
    return this.http.get<any>(`${DomainsConfig.domain}/payment-methods-public/get-withdrawal-methods`);
  }

}
