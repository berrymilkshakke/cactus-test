import {Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PromoCodesService} from '../../_core/services/promo-codes.service';


@Component({
  selector: 'app-modal-fs-bonus',
  templateUrl: './modal-fs-bonus.component.html',
  styleUrls: ['./modal-fs-bonus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFsBonusComponent implements OnInit {

  @Input() bonus: any;
  @Input() public promoCode: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;

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
              public authGuard: AuthGuard,
              public promoCodesService: PromoCodesService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  cancelPromoCode(promoCodeId: any) {
    this.promoCodesService.cancelPromoCode(promoCodeId);
  }

}
