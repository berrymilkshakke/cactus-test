import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {Helper} from '../../_core/classes/helper';
import {PlayerService} from '../../_core/services/player.service';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {first} from 'rxjs/operators';
import {FsBonusesDataSource} from '../../_core/datasources/fs-bonuses.datasource';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-fs-bonus-item',
  templateUrl: './fs-bonus-item.component.html',
  styleUrls: ['./fs-bonus-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FsBonusItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public promoCode: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;

  @Output() public bonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public bonusSelectedEvent: EventEmitter<object> = new EventEmitter();

  public cdnServer: any;
  public currencies: any;
  public allowDirectActivation: boolean = true;

  constructor(public authGuard: AuthGuard,
              public showModalService: ShowModalService,
              public playerService: PlayerService,
              public currenciesService: CurrenciesService,
              public fsBonusesService: FsBonusesService,
              public fsBonusesDataSource: FsBonusesDataSource,
              public translateService: TranslateService,
              public gamesService: GamesService) {
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

  errorHandler(event: any) {
    event.target.src = `assets/img/bonuses/default_bonus.webp`;
  }

  getGameTitle(gameId: any) {
    const game = this.gamesService.getGameById(gameId);

    if (!game) {
      return '';
    }

    return game.title;
  }

  getGameImage(gameId: any) {
    const game = this.gamesService.getGameById(gameId);

    if (!game) {
      return '';
    }

    return game.image;
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/promo/${imageName}`;
  }

  getGameImagePatch() {
    const gameId = this.fsBonusesService.getBonusOptionValue(this.bonus, 'game');

    if (!gameId) {
      return null;
    }

    const game = this.gamesService.getGameById(Helper.stringToJSON(gameId));

    if (!game) {
      return null;
    }

    const path = this.gamesService.getImagePatch(game.brand_name, game.image);

    return path;
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
  }

  selectBonus(bonusId: any) {
    this.bonusSelectedEvent.emit(bonusId);
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

  activateBonus() {
    this.fsBonusesDataSource.activateBonus(this.bonus.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.condition) {
            if (data.condition === 'email_confirmed') {
              this.translateService.get('bonuses.condition_confirm_email').subscribe((text: string) => {
                this.showModalService.openModalMessage(text);
              });
            } else if (data.condition === 'profile_filled') {
              this.translateService.get('bonuses.condition_fill_out_profile').subscribe((text: string) => {
                this.showModalService.openModalProfileInfo(null, text);
              });
            }
          }

          this.fsBonusesService.getBonuses();
        });
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  openModalFsBonus(bonus: any, showLink: boolean, showCancel: boolean, promoCode: any) {
    this.showModalService.openModalFsBonus(bonus, showLink, showCancel, promoCode);
  }
}
