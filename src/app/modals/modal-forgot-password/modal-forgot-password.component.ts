import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-modal-forgot-password',
  templateUrl: './modal-forgot-password.component.html',
  styleUrls: ['./modal-forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalForgotPasswordComponent {

  constructor(public activeModal: NgbActiveModal,
              public languagesService: LanguagesService) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
