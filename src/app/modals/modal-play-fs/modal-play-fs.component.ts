import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../_core/services/helper.service';


@Component({
  selector: 'app-modal-play-fs',
  templateUrl: './modal-play-fs.component.html',
  styleUrls: ['./modal-play-fs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalPlayFsComponent implements OnInit {

  @Input() bonus: any;

  constructor(public activeModal: NgbActiveModal,
              public helperService: HelperService) { }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }

  getUrlWithoutParameters() {
    return this.helperService.getUrlWithoutParameters();
  }

  getUrlPathWithoutParameters(pathRequested: any) {
    return this.helperService.getUrlPathWithoutParameters(pathRequested);
  }
}
