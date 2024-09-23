import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalPaymentComponent implements OnInit {

  @Input() url: string;
  @Input() commissionAmount: number;
  @Input() commissionCurrency: number;

  public safeUrl: any;

  constructor(public activeModal: NgbActiveModal,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  closeModal() {
    this.activeModal.close();
  }
}
