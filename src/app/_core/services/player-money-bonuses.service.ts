import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {GameService} from './game.service';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {PlayerMoneyBonusesDataSource} from '../datasources/player-money-bonuses.datasource';
import {LanguagesService} from './languages.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerMoneyBonusesService {

  public playerMoneyBonuses: any;
  public activeBonus: any;
  public activeBonusProgress: any;

  @Output() public playerMoneyBonusesUpdatedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public activePlayerMoneyBonusReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public newPlayerMoneyBonusIssuedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public playerMoneyBonusWageredEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerMoneyBonusCanceledEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public moneyBonusConditionNotFulfilledEvent: EventEmitter<object> = new EventEmitter();

  constructor(public playerMoneyBonusesDataSource: PlayerMoneyBonusesDataSource,
              public gamesService: GamesService,
              public authGuard: AuthGuard,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public gameService: GameService,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public languagesService: LanguagesService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getActivePlayerMoneyBonus();
      this.getPlayerMoneyBonuses();

      this.subscribeToEventNewPlayerMoneyBonusIssued();
      this.subscribeToEventPlayerMoneyBonusCanceled();
      this.subscribeToEventPlayerMoneyBonusWagered();
      this.subscribeToEventMoneyBonusConditionNotFulfilled();
    });

    authenticationService.logoutEvent.subscribe(() => {
      delete (this.activeBonus);
      delete (this.activeBonusProgress);
      delete (this.playerMoneyBonuses);
      this.playerMoneyBonusesUpdatedEvent.emit();
    });

    gameService.gameClosingEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getActivePlayerMoneyBonus();
      }
    });

    gamesService.allLoadedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getActivePlayerMoneyBonus();
      }
    });

    webSocketService.connectedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.subscribeToEventNewPlayerMoneyBonusIssued();
        this.subscribeToEventPlayerMoneyBonusCanceled();
        this.subscribeToEventPlayerMoneyBonusWagered();
        this.subscribeToEventMoneyBonusConditionNotFulfilled();
      }
    });

    languagesService.languageChangedEvent.subscribe((languageCode) => {
      if (this.authGuard.isAuthorized()) {
        this.getActivePlayerMoneyBonus();
      }
    });

    if (this.authGuard.isAuthorized()) {
      this.getPlayerMoneyBonuses();
    }
  }

  subscribeToEventNewPlayerMoneyBonusIssued() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'new-player-money-bonus-issued')
      .subscribe(data => {
        this.newPlayerMoneyBonusIssuedEvent.emit(data);
        this.getActivePlayerMoneyBonus();
        this.getPlayerMoneyBonuses();
      });
  }

  subscribeToEventPlayerMoneyBonusWagered() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-money-bonus-wagered')
      .subscribe(data => {
        this.playerMoneyBonusWageredEvent.emit();
        delete (this.activeBonus);
        this.getPlayerMoneyBonuses();
      });
  }

  subscribeToEventPlayerMoneyBonusCanceled() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-money-bonus-canceled')
      .subscribe(data => {
        this.playerMoneyBonusCanceledEvent.emit();
        const activeBonus = this.activeBonus;
        if (activeBonus && activeBonus.id === data.bonusId) {
          delete (this.activeBonus);
          this.gamesService.unsetAllowedFlag();
        }
        this.getPlayerMoneyBonuses();
      });
  }

  subscribeToEventMoneyBonusConditionNotFulfilled() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'money-bonus-condition-not-fulfilled')
      .subscribe(data => {
        this.moneyBonusConditionNotFulfilledEvent.emit(data.conditionName);
      });
  }

  getPlayerMoneyBonuses() {
    this.playerMoneyBonusesDataSource.getMoneyBonuses()
      .pipe(first())
      .subscribe(
        data => {
          this.playerMoneyBonuses = data;
          this.playerMoneyBonusesUpdatedEvent.emit();
        });
  }

  getActivePlayerMoneyBonus() {
    this.playerMoneyBonusesDataSource
      .getActiveMoneyBonus()
      .pipe(first())
      .subscribe(
        data => {

          if (!data.id) {
            delete (this.activeBonus);
            this.gamesService.unsetAllowedFlag();
            return;
          }

          const currentAmount = parseInt(data.wager_current_amount, 10);
          const requiredAmount = parseInt(data.wager_required_amount, 10);

          const currentProgress = Math.floor(currentAmount / (requiredAmount / 100));

          const providersAllowed = data.providers_allowed;
          const gamesAllowed = data.games_allowed;
          const gamesDisallowed = data.games_disallowed;

          if (providersAllowed !== null || gamesAllowed !== null || gamesDisallowed !== null) {
            this.gamesService.setAllowedFlag(providersAllowed, gamesAllowed, gamesDisallowed);
          }

          this.activeBonus = data;
          this.activeBonusProgress = currentProgress;
          this.activePlayerMoneyBonusReceivedEvent.emit();
        });
  }

  activatePlayerMoneyBonus(bonusId: any) {
    this.playerMoneyBonusesDataSource.activateMoneyBonus(bonusId)
      .pipe(first())
      .subscribe(
        data => {
          this.translateService.get('notifications.bonus_activated').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.getPlayerMoneyBonuses();
          this.getActivePlayerMoneyBonus();
        });
  }

  cancelPlayerMoneyBonus(bonusId: any) {
    this.playerMoneyBonusesDataSource.cancelMoneyBonus(bonusId)
      .pipe(first())
      .subscribe(
        data => {
          this.getPlayerMoneyBonuses();
          this.getActivePlayerMoneyBonus();
        });
  }
}
