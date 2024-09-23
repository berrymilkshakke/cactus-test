import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-new-money-bonus',
  templateUrl: './modal-new-money-bonus.component.html',
  styleUrls: ['./modal-new-money-bonus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalNewMoneyBonusComponent implements OnInit {

  @Input() bonus: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
