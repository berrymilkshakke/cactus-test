import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-modal-no-deposit-bonuses',
  templateUrl: './modal-no-deposit-bonuses.component.html',
  styleUrls: ['./modal-no-deposit-bonuses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalNoDepositBonusesComponent implements OnInit {

  @Input() bonus: any;

  constructor(public activeModal: NgbActiveModal,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit() {

   }

  closeModal() {
   this.activeModal.close();
  }

}
