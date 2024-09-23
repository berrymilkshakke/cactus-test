import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-add-to-desktop',
  templateUrl: './modal-add-to-desktop.component.html',
  styleUrls: ['./modal-add-to-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAddToDesktopComponent {

  constructor(public activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }

}
