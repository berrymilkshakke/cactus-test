import {Component, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../../modals/_services/show-modal.service';
import {NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {PaymentsDataSource} from '../../../_core/datasources/payments.datasource';
import {Helper} from '../../../_core/classes/helper';
import {first} from 'rxjs/operators';
import {CustomDateParserFormatter} from '../../../_core/classes/custom-date-parser-formatter';


@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  encapsulation: ViewEncapsulation.None
})
export class WalletHistoryComponent {

  public payments: any;

  public dateFrom: any;
  public dateTo: any;

  constructor(public showModalService: ShowModalService,
              public ngbCalendar: NgbCalendar,
              public paymentsDataSource: PaymentsDataSource) {
    this.dateFrom = this.ngbCalendar.getToday();
    this.dateTo = this.ngbCalendar.getToday();

    this.showPayments();
  }

  showPayments() {
    this.paymentsDataSource
      .getPlayerPayments(
        Helper.dateToString(this.dateFrom),
        Helper.dateToString(this.dateTo),
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.payments = data;
        });
  }

  cancelWithdrawal(id: any) {
    this.paymentsDataSource
      .cancelWithdrawal(id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.showPayments();
        },
        (errors: any) => {

        });
  }
}
