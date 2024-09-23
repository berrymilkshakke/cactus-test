import {Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  selector: 'app-modal-player-fs-bonus',
  templateUrl: './modal-player-fs-bonus.component.html',
  styleUrls: ['./modal-player-fs-bonus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPlayerFsBonusComponent implements OnInit {

  @Input() bonus: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;
  @Input() public showButtons: boolean = true;

  @Input() public isMoneyBonus: boolean = false;
  @Input() public isFsBonus: boolean = false;
  @Input() public isPlayerMoneyBonus: boolean = false;
  @Input() public isPlayerFsBonus: boolean = false;
  @Input() public isHistoryMoneyBonus: boolean = false;
  @Input() public isHistoryFsBonus: boolean = false;

  @Output() public bonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public bonusSelectedEvent: EventEmitter<object> = new EventEmitter();

  public cdnServer: any;
  public currencies: any;
  public allowDirectActivation: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public authGuard: AuthGuard
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
