import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GamesService} from '../../_core/services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {CurrenciesService} from '../../_core/services/currencies.service';
import {PlayerService} from '../../_core/services/player.service';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {Helper} from '../../_core/classes/helper';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-fs-bonus-simple-item',
  templateUrl: './fs-bonus-simple-item.component.html',
  styleUrls: ['./fs-bonus-simple-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FsBonusSimpleItemComponent implements OnInit {

  @Input() public bonus: any;
  @Input() public isBonusAllowed: boolean = true;
  @Input() public horizontal: boolean = false;
  @Input() public showLink: boolean = true;
  @Input() public showCancel: boolean = false;

  @Output() public bonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public bonusSelectedEvent: EventEmitter<object> = new EventEmitter();

  public cdnServer: any;
  public currencies: any;

  constructor(public authGuard: AuthGuard,
              public showModalService: ShowModalService,
              public playerService: PlayerService,
              public currenciesService: CurrenciesService,
              public fsBonusesService: FsBonusesService,
              public gamesService: GamesService) {
  }

  ngOnInit() {
    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
    });

    this.cdnServer = DomainsConfig.cdnServer;
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
}
