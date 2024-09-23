import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class LotteriesPublicDataSource {

  constructor(public http: HttpClient) {
  }

  getLotteriesActive() {
    return this.http.get<any>(`${DomainsConfig.domain}/lotteries-public/get-lotteries-active`);
  }

  getLotteriesFinished() {
    return this.http.get<any>(`${DomainsConfig.domain}/lotteries-public/get-lotteries-finished`);
  }

  getLottery(lotteryId: string) {
    return this.http.get<any>(`${DomainsConfig.domain}/lotteries-public/get-lottery/${lotteryId}`);
  }

}
