import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {PlayerFsBonusesDataSource} from '../datasources/player-fs-bonuses.datasource';
import {LanguagesService} from './languages.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerFsBonusesService {

  public playerFsBonuses: any;
  public activeBonus: any;

  @Output() public playerFsBonusesUpdatedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public newPlayerFsBonusIssuedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public playerFsBonusActivatedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public playerFsBonusPlayedEvent: EventEmitter<object> = new EventEmitter();
  @Output() public playerFsBonusCanceledEvent: EventEmitter<object> = new EventEmitter();
  @Output() public fsBonusConditionNotFulfilledEvent: EventEmitter<object> = new EventEmitter();

  constructor(public playerFsBonusesDataSource: PlayerFsBonusesDataSource,
              public gamesService: GamesService,
              public authGuard: AuthGuard,
              public authenticationService: AuthenticationService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public languagesService: LanguagesService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getPlayerFsBonuses();

      this.subscribeToEventNewPlayerFsBonusIssued();
      this.subscribeToEventPlayerFsBonusPlayed();
      this.subscribeToEventPlayerFsBonusCanceled();
      this.subscribeToEventFsBonusConditionNotFulfilled();
    });

    authenticationService.logoutEvent.subscribe(() => {
      delete (this.activeBonus);
      delete (this.playerFsBonuses);
      this.playerFsBonusesUpdatedEvent.emit();
    });

    webSocketService.connectedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.subscribeToEventNewPlayerFsBonusIssued();
        this.subscribeToEventPlayerFsBonusPlayed();
        this.subscribeToEventPlayerFsBonusCanceled();
        this.subscribeToEventFsBonusConditionNotFulfilled();
      }
    });

    languagesService.languageChangedEvent.subscribe((languageCode: string) => {
      if (this.authGuard.isAuthorized()) {
        this.getPlayerFsBonuses();
      }
    });

    if (this.authGuard.isAuthorized()) {
      this.getPlayerFsBonuses();
    }
  }

  subscribeToEventNewPlayerFsBonusIssued() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'new-player-fs-bonus-issued')
      .subscribe(data => {
        this.newPlayerFsBonusIssuedEvent.emit(data);
        this.getPlayerFsBonuses();
      });
  }

  subscribeToEventPlayerFsBonusPlayed() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-fs-bonus-played')
      .subscribe(data => {
        this.playerFsBonusPlayedEvent.emit(data);
        delete (this.activeBonus);
        this.getPlayerFsBonuses();
      });
  }

  subscribeToEventPlayerFsBonusCanceled() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-fs-bonus-canceled')
      .subscribe(data => {
        this.playerFsBonusCanceledEvent.emit(data);
        const activeBonus = this.activeBonus;
        if (activeBonus && activeBonus.id === data.bonusId) {
          delete (this.activeBonus);
        }
        this.getPlayerFsBonuses();
      });
  }

  subscribeToEventFsBonusConditionNotFulfilled() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'fs-bonus-condition-not-fulfilled')
      .subscribe(data => {
        this.fsBonusConditionNotFulfilledEvent.emit(data.conditionName);
      });
  }

  getPlayerFsBonuses() {
    this.playerFsBonusesDataSource.getFsBonuses()
      .pipe(first())
      .subscribe(
        data => {
          for (const bonus of data) {
            if (bonus.activated) {
              this.activeBonus = bonus;
            }
          }

          this.playerFsBonuses = data;
          this.playerFsBonusesUpdatedEvent.emit();
        });
  }

  activatePlayerFsBonus(bonusId: any) {
    this.playerFsBonusesDataSource.activatePlayerFsBonus(bonusId)
      .pipe(first())
      .subscribe(
        data => {
          this.translateService.get('notifications.bonus_activated').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.getPlayerFsBonuses();
          this.playerFsBonusActivatedEvent.emit(bonusId);
        });
  }

  cancelPlayerFsBonus(bonusId: any) {
    this.playerFsBonusesDataSource.cancelPlayerFsBonus(bonusId)
      .pipe(first())
      .subscribe(
        data => {
          this.getPlayerFsBonuses();
          this.playerFsBonusCanceledEvent.emit(bonusId);
        });
  }
}
