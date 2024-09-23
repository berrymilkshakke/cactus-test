import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PaymentsDataSource} from '../../_core/datasources/payments.datasource';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-modal-payment-fps',
  templateUrl: './modal-payment-fps.component.html',
  styleUrls: ['./modal-payment-fps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPaymentFpsComponent {

  @Input() id: any;
  @Input() amount: number;
  @Input() currencyCode: string;
  @Input() bank: string;
  @Input() phoneNumber: string;
  @Input() recipient: string;

  public openInstruction: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public paymentsDataSource: PaymentsDataSource,
              public translateService: TranslateService,
              public notifierService: NotifierService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  toggle() {
    this.openInstruction = !this.openInstruction;
  }

  copyToClipboard(inputElement: any) {
    navigator.clipboard.writeText(inputElement).then().catch(e => console.log(e));

    this.translateService.get('notifications.copied').subscribe((text: string) => {
      this.notifierService.notify('success', text);
    });

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
    event.target.src = `assets/img/payment-logo/sbp.svg`;
  }
}
