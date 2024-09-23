import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalMessageComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
