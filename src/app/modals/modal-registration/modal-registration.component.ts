import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalRegistrationComponent {

  public cdnServer: any;

  constructor(public activeModal: NgbActiveModal) {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  closeModal() {
    this.activeModal.close();
  }

}
