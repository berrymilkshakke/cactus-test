import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-payment-redirect',
  templateUrl: './modal-payment-redirect.component.html',
  styleUrls: ['./modal-payment-redirect.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'myCustomStyle' }
})
export class ModalPaymentRedirectComponent implements OnInit {

  @Input() url: string;
  @Input() commissionAmount: number;
  @Input() commissionCurrency: number;

  public myCustomStyle: string = 'modal-payment';

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
