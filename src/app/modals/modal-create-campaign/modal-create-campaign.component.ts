import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-create-campaign',
  templateUrl: './modal-create-campaign.component.html',
  styleUrls: ['./modal-create-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalCreateCampaignComponent implements OnInit {

  @Input() fieldsRequired: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
