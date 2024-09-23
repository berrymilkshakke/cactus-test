import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-modal-set-password',
  templateUrl: './modal-set-password.component.html',
  styleUrls: ['./modal-set-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSetPasswordComponent {

  @Input() public token: string;

  constructor(public activeModal: NgbActiveModal,
              public languagesService: LanguagesService) {}

  closeModal() {
    this.activeModal.close();
  }
}
