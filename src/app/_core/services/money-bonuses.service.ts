import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {PlayerMoneyBonusesService} from './player-money-bonuses.service';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {MoneyBonusesDataSource} from '../datasources/money-bonuses.datasource';
import {MoneyBonusesPublicDataSource} from '../datasources/money-bonuses-public.datasource';
import {LanguagesService} from './languages.service';


@Injectable({
  providedIn: 'root'
})
export class MoneyBonusesService {

  public moneyBonuses: any;
  public selectedBonus: any;

  public selectedMoneyBonusFieldName = 'selectedMoneyBonusId';

  @Output() public moneyBonusesUpdatedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public selectedBonusUpdatedEvent: EventEmitter<object> = new EventEmitter();

  constructor(public gamesService: GamesService,
              public moneyBonusesDataSource: MoneyBonusesDataSource,
              public moneyBonusesPublicDataSource: MoneyBonusesPublicDataSource,
              public authGuard: AuthGuard,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public languagesService: LanguagesService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getMoneyBonuses();
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.getMoneyBonusesPublic();
    });

    playerMoneyBonusesService.newPlayerMoneyBonusIssuedEvent.subscribe(() => {
      this.getMoneyBonuses();
    });

    webSocketService.connectedEvent.subscribe(() => {
      this.subscribeToEventMoneyBonusesUpdated();
    });

    languagesService.languageChangedEvent.subscribe((languageCode: string) => {
      if (this.authGuard.isAuthorized()) {
        this.getMoneyBonuses();
      } else {
        this.getMoneyBonusesPublic();
      }
    });

    this.getBonuses();
  }

  getBonuses() {
    if (this.authGuard.isAuthorized()) {
      this.getMoneyBonuses();
    } else {
      this.getMoneyBonusesPublic();
    }
  }

  subscribeToEventMoneyBonusesUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'money-bonuses-updated')
      .subscribe(data => {
        this.getBonuses();
      });
  }

  getMoneyBonuses() {
    this.moneyBonusesDataSource.getMoneyBonuses()
      .pipe(first())
      .subscribe(
        data => {
          this.moneyBonuses = data;
          this.moneyBonusesUpdatedEvent.emit();

          this.setSelectedBonus();
        });
  }

  getMoneyBonusesPublic() {
    this.moneyBonusesPublicDataSource.getMoneyBonuses()
      .pipe(first())
      .subscribe(
        data => {
          this.moneyBonuses = data;
          this.moneyBonusesUpdatedEvent.emit();
        });
  }

  getById(id: number) {
    const moneyBonuses = this.moneyBonuses;

    if (!moneyBonuses) {
      return null;
    }

    const bonus = moneyBonuses.find((item: any) => item.id === id);

    if (bonus === undefined) {
      return null;
    }

    return bonus;
  }

  saveSelectedBonusId(moneyBonusId: number) {
    localStorage.setItem(this.selectedMoneyBonusFieldName, moneyBonusId.toString());
    this.setSelectedBonus();
  }

  setSelectedBonus() {
    const bonusId = localStorage.getItem(this.selectedMoneyBonusFieldName);

    if (!bonusId) {
      return;
    }

    const bonus = this.getById(Number(bonusId));

    if (bonus) {
      this.selectedBonus = bonus;
      this.selectedBonusUpdatedEvent.emit();
    }
  }

  deleteSelectedBonus() {
    localStorage.setItem(this.selectedMoneyBonusFieldName, null);
    delete (this.selectedBonus);
    this.selectedBonusUpdatedEvent.emit();
  }

  getBonusOptionValue(bonus: any, optionName: string) {
    const bonusOptions = bonus.bonus_options;

    if (!bonusOptions) {
      return null;
    }

    const option = bonusOptions.find(function (element: any) {
      return element.name === optionName;
    });

    if (!option) {
      return null;
    }

    return JSON.parse(option.value);
  }

  getBonusConditionValue(bonus: any, conditionName: string) {
    const bonusConditions = bonus.bonus_conditions;

    if (!bonusConditions) {
      return null;
    }

    const condition = bonusConditions.find(function (element: any) {
      return element.name === conditionName;
    });

    if (!condition) {
      return null;
    }

    return JSON.parse(condition.value);
  }
}
