import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PromoCodesDataSource {

  constructor(public http: HttpClient) {
  }

  getPromoCode() {
    return this.http.get<any>(`${DomainsConfig.domain}/promo-codes/get-promo-code`);
  }

  sendPromoCode(code: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/promo-codes/send-promo-code`, {code});
  }

  cancelPromoCode(codeId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/promo-codes/cancel-promo-code/${codeId}`, {});
  }

}
