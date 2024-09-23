import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalLoginComponent {

  public cdnServer: any;

  constructor(public activeModal: NgbActiveModal) {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  closeModal() {
    this.activeModal.close();
  }

}
