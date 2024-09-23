import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GameService} from '../../_core/services/game.service';


@Component({
  selector: 'app-modal-provider-account-is-not-money',
  templateUrl: './modal-provider-account-is-not-money.component.html',
  styleUrls: ['./modal-provider-account-is-not-money.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalProviderAccountIsNotMoneyComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              public gameService: GameService) {
  }

  ngOnInit() {
  }

  continueTheGame() {
    this.closeModal();
    this.gameService.reopenGameEvent.emit();
  }

  closeModal() {
    this.activeModal.close();
  }
}
