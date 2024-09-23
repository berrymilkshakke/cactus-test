import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalWarningComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
