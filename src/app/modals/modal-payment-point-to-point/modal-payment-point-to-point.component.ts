import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentsDataSource} from '../../_core/datasources/payments.datasource';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-modal-payment-point-to-point',
  templateUrl: './modal-payment-point-to-point.component.html',
  styleUrls: ['./modal-payment-point-to-point.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPaymentPointToPointComponent {

  @Input() id: any;
  @Input() amount: number;
  @Input() currencyCode: string;
  @Input() bank: string;
  @Input() card: string;
  @Input() recipient: string;

  public openInstruction: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public paymentsDataSource: PaymentsDataSource) {
  }

  closeModal() {
    this.activeModal.close();
  }

  toggle() {
    this.openInstruction = !this.openInstruction;
  }

  copyToClipboard(inputElement: any) {
    navigator.clipboard.writeText(inputElement).then().catch(e => console.log(e));
  }

  confirmPayment() {
    this.paymentsDataSource.confirmDeposit(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.activeModal.close();
        });
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/payment-logo/default_bank.svg`;
  }
}
