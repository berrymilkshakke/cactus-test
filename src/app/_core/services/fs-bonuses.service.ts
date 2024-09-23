import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {PlayerFsBonusesService} from './player-fs-bonuses.service';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {FsBonusesDataSource} from '../datasources/fs-bonuses.datasource';
import {FsBonusesPublicDataSource} from '../datasources/fs-bonuses-public.datasource';
import {LanguagesService} from './languages.service';


@Injectable({
  providedIn: 'root'
})
export class FsBonusesService {

  public fsBonuses: any;
  public selectedBonus: any;

  public selectedFsBonusFieldName = 'selectedFsBonusId';

  @Output() public fsBonusesUpdatedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public selectedBonusUpdatedEvent: EventEmitter<object> = new EventEmitter();

  constructor(public gamesService: GamesService,
              public fsBonusesDataSource: FsBonusesDataSource,
              public fsBonusesPublicDataSource: FsBonusesPublicDataSource,
              public authGuard: AuthGuard,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public playerFsBonusesService: PlayerFsBonusesService,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public languagesService: LanguagesService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getFsBonuses();
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.getFsBonusesPublic();
    });

    playerFsBonusesService.newPlayerFsBonusIssuedEvent.subscribe(() => {
      this.getFsBonuses();
    });

    webSocketService.connectedEvent.subscribe(() => {
      this.subscribeToEventFsBonusesUpdated();
    });

    languagesService.languageChangedEvent.subscribe((languageCode) => {
      if (this.authGuard.isAuthorized()) {
        this.getFsBonuses();
      } else {
        this.getFsBonusesPublic();
      }
    });

    this.getBonuses();
  }

  getBonuses() {
    if (this.authGuard.isAuthorized()) {
      this.getFsBonuses();
    } else {
      this.getFsBonusesPublic();
    }
  }

  subscribeToEventFsBonusesUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'fs-bonuses-updated')
      .subscribe(data => {
        this.getBonuses();
      });
  }

  getFsBonuses() {
    this.fsBonusesDataSource.getFsBonuses()
      .pipe(first())
      .subscribe(
        data => {
          this.fsBonuses = data;
          this.fsBonusesUpdatedEvent.emit();

          this.setSelectedBonus();
        });
  }

  getFsBonusesPublic() {
    this.fsBonusesPublicDataSource.getFsBonuses()
      .pipe(first())
      .subscribe(
        data => {
          this.fsBonuses = data;
          this.fsBonusesUpdatedEvent.emit();
        });
  }

  getById(id: number) {
    const fsBonuses = this.fsBonuses;

    if (!fsBonuses) {
      return null;
    }

    const bonus = fsBonuses.find(item => item.id === id);

    if (bonus === undefined) {
      return null;
    }

    return bonus;
  }

  saveSelectedBonusId(fsBonusId: number) {
    localStorage.setItem(this.selectedFsBonusFieldName, fsBonusId.toString());
    this.setSelectedBonus();
  }

  setSelectedBonus() {
    const bonusId = localStorage.getItem(this.selectedFsBonusFieldName);

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
    localStorage.setItem(this.selectedFsBonusFieldName, null);
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

  getOptionMoneyBonus(bonus: any, optionName: string) {
    const bonusOptions = bonus.money_bonus.bonus_options;

    const option = bonusOptions.find(function (element: any) {
      return element.name === optionName;
    });

    if (!option) {
      return null;
    }

    return JSON.parse(option.value);
  }
}
