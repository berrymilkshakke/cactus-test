import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent implements OnInit {

  @Input() public name: string;

  constructor(public activeModal: NgbActiveModal,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    //
  }

  closeModal() {
    this.activeModal.close();
  }
}
