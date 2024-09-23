import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {Helper} from '../../_core/classes/helper';
import {PlayerService} from '../../_core/services/player.service';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {FsBonusesDataSource} from '../../_core/datasources/fs-bonuses.datasource';
import {TranslateService} from '@ngx-translate/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fs-bonus-modal-item',
  templateUrl: './fs-bonus-modal-item.component.html',
  styleUrls: ['./fs-bonus-modal-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FsBonusModalItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public promoCode: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;
  @Input() public showButtons: boolean = true;

  @Output() public bonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public bonusSelectedEvent: EventEmitter<object> = new EventEmitter();

  public cdnServer: any;
  public currencies: any;
  public allowDirectActivation: boolean = false; 

  constructor(public authGuard: AuthGuard,
              public showModalService: ShowModalService,
              public playerService: PlayerService,
              public currenciesService: CurrenciesService,
              public fsBonusesService: FsBonusesService,
              public fsBonusesDataSource: FsBonusesDataSource,
              public translateService: TranslateService,
              public gamesService: GamesService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.cdnServer = DomainsConfig.cdnServer;

    if (this.authGuard.isAuthorized()) {
      this.checkConditions();
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  checkConditions() {
    for (const condition of this.bonus.bonus_conditions) {

      if (condition.name === 'in_groups') {
        let isBonusAllowed = false;
        const groups = Helper.stringToJSON(condition.value);
        for (const groupId of groups) {
          if (this.playerService.isIdInPlayerGroups(Number(groupId))) {
            isBonusAllowed = true;
            break;
          }
        }
        this.isBonusAllowed = isBonusAllowed;
      }

      if (condition.name === 'minimum_deposit_amount') {
        this.allowDirectActivation = false;
      }
    }
  }

  getGameTitle(gameId: any) {
    const game = this.gamesService.getGameById(gameId);

    if (!game) {
      return '';
    }

    return game.title;
  }

  calculateBetAmount(currency: any) {

    const betAmount = this.fsBonusesService.getBonusOptionValue(this.bonus, 'bet_amount');
    const linesCount = this.fsBonusesService.getBonusOptionValue(this.bonus, 'lines_count');
    const denomination = this.fsBonusesService.getBonusOptionValue(this.bonus, 'denomination');

    if (currency) {
      const v = betAmount[currency] * linesCount * denomination[currency];
      return v;
    } else {
      return null;
    }
  }

  cancelBonus() {
    this.bonusCanceledEvent.emit();
    this.closeModal();
  }

  selectBonus(bonusId: any) {
    this.bonusSelectedEvent.emit(bonusId);
    this.closeModal();
  }

  getSelectedBonus() {
    return this.fsBonusesService.selectedBonus;
  }

  getSelectedBonusId() {
    return this.fsBonusesService.selectedBonus.id;
  }
  
  getBonusOptionValue(bonus: any, optionName: string) {
    return this.fsBonusesService.getBonusOptionValue(bonus, optionName);
  }

  getBonusConditionValue(bonus: any, conditionName: string) {
    return this.fsBonusesService.getBonusConditionValue(bonus, conditionName);
  }

  getPlayerCurrencyCode() {
    return this.playerService.currencyCode;
  }

  getOptionMoneyBonus(bonus: any, optionName: string) {
    return this.fsBonusesService.getOptionMoneyBonus(bonus, optionName);
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  getWageringDurationDays(bonus: any, optionName: string) {
    let item = this.fsBonusesService.getOptionMoneyBonus(bonus, optionName);
    return item.amount;
  }

  getMaximumWin(currency: any) {
    const maxWin = this.fsBonusesService.getOptionMoneyBonus(this.bonus, 'maximum_win');
    if (currency) {
      const v = maxWin[currency];
      return v;
    } else {
      return null;
    }
  }

}
