import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {Helper} from '../../_core/classes/helper';
import {PlayerService} from '../../_core/services/player.service';
import {SystemConfig} from '../../_configs/system.conf';
import {MoneyBonusesService} from '../../_core/services/money-bonuses.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-money-bonus-item',
  templateUrl: './money-bonus-item.component.html',
  styleUrls: ['./money-bonus-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyBonusItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public promoCode: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public showLink: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showCancel: boolean = false;

  @Output() public bonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public bonusSelectedEvent: EventEmitter<object> = new EventEmitter();

  public cdnServer: any;

  constructor(public authGuard: AuthGuard,
              public showModalService: ShowModalService,
              public moneyBonusesService: MoneyBonusesService,
              public playerService: PlayerService) {
  }

  ngOnInit() {
    this.cdnServer = DomainsConfig.cdnServer;

    const bonus = this.bonus;

    if (this.authGuard.isAuthorized()) {

      for (const condition of bonus.bonus_conditions) {

        if (condition.name === 'in_groups') {
          let isBonusAllowed = false;
          const groups = Helper.stringToJSON(condition.value) || [];
          for (const groupId of groups) {
            if (this.playerService.isIdInPlayerGroups(Number(groupId))) {
              isBonusAllowed = true;
              break;
            }
          }
          this.isBonusAllowed = isBonusAllowed;
        } else if (condition.name === 'repeat_every_n_day_of_the_week') {

        }
      }
    }
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/promo/${imageName}`;
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/bonuses/default_bonus.webp`;
  }

  cancelBonus() {
    this.bonusCanceledEvent.emit();
  }

  selectBonus(bonusId: any) {
    this.bonusSelectedEvent.emit(bonusId);
  }

  getSelectedBonus() {
    return this.moneyBonusesService.selectedBonus;
  }

  getSelectedBonusId() {
    return this.moneyBonusesService.selectedBonus.id;
  }

  getBonusOptionValue(bonus: any, optionName: string) {
    return this.moneyBonusesService.getBonusOptionValue(bonus, optionName);
  }

  getBonusConditionValue(bonus: any, conditionName: string) {
    return this.moneyBonusesService.getBonusConditionValue(bonus, conditionName);
  }

  getPlayerCurrencyCode() {
    const playerCurrencyCode = this.playerService.currencyCode;
    if (playerCurrencyCode) {
      return playerCurrencyCode;
    } else {
      return SystemConfig.defaultCurrencyCode; // Todo: get guest curerncy code
    }
  }

  openModalMoneyBonus(bonus: any, showLink: boolean, showCancel: boolean, promoCode: any) {
    this.showModalService.openModalMoneyBonus(bonus, showLink, showCancel, promoCode);
  } 
}
