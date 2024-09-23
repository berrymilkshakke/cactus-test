import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-profile-info',
  templateUrl: './modal-profile-info.component.html',
  styleUrls: ['./modal-profile-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalProfileInfoComponent implements OnInit {

  @Input() fieldsRequired: any;
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
