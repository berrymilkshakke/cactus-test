import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PaymentsDataSource {

  constructor(public http: HttpClient) {
  }

  getPlayerPayments(dateFrom: string, dateTo: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/payments/get-player-payments`,
      {dateFrom, dateTo});
  }

  getPlayerWithdrawals() {
    return this.http.get<any>(`${DomainsConfig.domain}/payments/get-player-withdrawals`);
  }

  deposit(
    paymentMethodId: string,
    amount: string,
    account: string,
    expirationDateMonth: string,
    expirationDateYear: string,
    bonusAllowed: string,
    moneyBonusId: any,
    fsBonusId: any
  ) {
    return this.http.post<any>(`${DomainsConfig.domain}/payments/deposit`,
      {
        paymentMethodId,
        amount,
        account,
        expirationDateMonth,
        expirationDateYear,
        bonusAllowed,
        moneyBonusId,
        fsBonusId
      });
  }

  withdraw(
    paymentMethodId: string,
    amount: string,
    account: string,
    expirationDateMonth: string,
    expirationDateYear: string,
    bankId: number
  ) {
    return this.http.post<any>(`${DomainsConfig.domain}/payments/withdraw`,
      {
        paymentMethodId,
        amount,
        account,
        expirationDateMonth,
        expirationDateYear,
        bankId
      });
  }

  cancelWithdrawal(withdrawalId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/payments/cancel-withdrawal/${withdrawalId}`, {});
  }

  confirmDeposit(depositId: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/payments/confirm-deposit/${depositId}`, {});
  }
}
