import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {PlayerMoneyBonusesDataSource} from '../../_core/datasources/player-money-bonuses.datasource';


@Component({
  selector: 'app-modal-exceeded-maximum-bet',
  templateUrl: './modal-exceeded-maximum-bet.component.html',
  styleUrls: ['./modal-exceeded-maximum-bet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalExceededMaximumBetComponent implements OnInit {

  @Input() betAmount: number;
  @Input() betCurrency: string;
  @Input() bonus: any;

  constructor(public activeModal: NgbActiveModal,
              public playerMoneyBonusesDataSource: PlayerMoneyBonusesDataSource) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
