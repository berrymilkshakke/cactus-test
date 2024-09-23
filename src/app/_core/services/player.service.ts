import {EventEmitter, Injectable, Output} from '@angular/core';
import {PlayerDataSource} from '../datasources/player.datasource';
import {Player} from '../models/player';
import {first} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {GamesService} from './games.service';
import {WebSocketService} from './websocket.service';
import {GameService} from './game.service';
import {AuthGuard} from '../guards/auth.guard';
import {PlayerMoneyBonusesService} from './player-money-bonuses.service';
import {EchoService} from 'ngx-laravel-echo';
import {LanguagesService} from './languages.service';
import { IdentificationService } from './identification.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public player: Player;

  public accounts: [];
  public defaultAccount: any;
  public currencyCode: string;
  public pointsAccount: [];

  public playerGroups: any;
  public playerGroupsPublic: any;

  public currentPublicGroup: any;
  public currentProgress: any;
  public pointsToNextLevel: number;

  @Output() public playerDataReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public playerAccountsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerDefaultAccountReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerPointsAccountReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerLocaleUpdatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerEmailChangedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerVerifiedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public playerGroupsChangedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerGroupsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public depositCompletedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public withdrawalCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public exceededMaximumBetEvent: EventEmitter<object> = new EventEmitter();
  @Output() public depositsCountReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerProfileChangedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gameIsNotAllowedForBonusEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public providerAccountIsNotBonusEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public providerAccountIsNotMoneyEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public newLevelEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public showModalDepositEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public playerDataSource: PlayerDataSource,
              public authenticationService: AuthenticationService,
              public gameService: GameService,
              public gamesService: GamesService,
              public webSocketService: WebSocketService,
              public authGuard: AuthGuard,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public echoService: EchoService,
              public identificationService: IdentificationService,
              public languagesService: LanguagesService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getPlayer();
      this.getDefaultPlayerAccount();
      this.getPlayerGroups();

      this.subscribeToEventAccountBalanceUpdated();
      this.subscribeToEventAccountDepositCompleted();
      this.subscribeToEventPlayerGroupsChangedSubscribe();
      this.subscribeToEventExceededMaximumBet();
      this.subscribeToEventGameIsNotAllowedForBonus();
      this.subscribeToEventProviderAccountIsNotBonus();
      this.subscribeToEventProviderAccountIsNotMoney();
      this.subscribeToEventPlayerEmailChanged();
      this.subscribeToEventPlayerVerified();
    });

    authenticationService.logoutEvent.subscribe(() => {
      delete (this.player);
      delete (this.accounts);
      delete (this.defaultAccount);
      delete (this.currencyCode);
      delete (this.pointsAccount);
      delete (this.playerGroups);
      delete (this.currentPublicGroup);
      delete (this.currentProgress);
    });

    gameService.gameClosingEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getDefaultPlayerAccount();
        this.getPointsAccount();
      }
    });

    playerMoneyBonusesService.newPlayerMoneyBonusIssuedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getDefaultPlayerAccount();
      }
    });

    languagesService.languageChangedEvent.subscribe((languageCode: string) => {
      if (this.authGuard.isAuthorized()) {
        this.setPlayerLocale(languageCode);
      }
    });

    webSocketService.connectedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.subscribeToEventAccountBalanceUpdated();
        this.subscribeToEventAccountDepositCompleted();
        this.subscribeToEventPlayerGroupsChangedSubscribe();
        this.subscribeToEventExceededMaximumBet();
        this.subscribeToEventGameIsNotAllowedForBonus();
        this.subscribeToEventProviderAccountIsNotBonus();
        this.subscribeToEventProviderAccountIsNotMoney();
        this.subscribeToEventPlayerEmailChanged();
        this.subscribeToEventPlayerVerified();
      }
    });

    this.playerProfileChangedEvent.subscribe(() => {
      this.getPlayer();
    });

    this.playerVerifiedEvent.subscribe(() => {
      this.getPlayer();
    });

    this.playerDataReceivedEvent.subscribe(() => {
      const currentLanguage = languagesService.currentLanguage;
      if (currentLanguage && (this.player.locale_code !== currentLanguage.code)) {
        languagesService.setLanguage(currentLanguage);
      }
    });

    /*
    this.languagesService.languageSetEvent.subscribe(() => {
      const currentLanguageCode = languagesService.currentLanguageCode;
      if (currentLanguageCode && this.player) {
        if (this.player.locale_code !== currentLanguageCode) {
          const currentLanguage = languagesService.getLanguage(this.player.locale_code);
          if (currentLanguage) {
            languagesService.setLanguage(currentLanguage);
          }
        }
      }
    });
     */

    this.playerGroupsReceivedEvent.subscribe(() => {
      this.getPointsAccount();
    });

    this.playerPointsAccountReceivedEvent.subscribe(() => {
      const pointsBalance = parseInt(this.pointsAccount['balance'], 10);
      this.setCurrentProgress(pointsBalance);
    });

    if (this.authGuard.isAuthorized()) {
      this.getPlayer();
      this.getDefaultPlayerAccount();
      this.getPlayerGroups();
    }

    setInterval(() => {
      if (this.authGuard.isAuthorized()) {
        this.getPointsAccount();
      }
    }, 60 * 1000);
  }

  subscribeToEventAccountBalanceUpdated() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'account-balance-updated')
      .subscribe(data => {
        this.getDefaultPlayerAccount();
      });
  }

  subscribeToEventAccountDepositCompleted() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'deposit-completed')
      .subscribe(data => {
        this.depositCompletedEvent.emit();
      });
  }

  subscribeToEventPlayerGroupsChangedSubscribe() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-groups-changed')
      .subscribe(data => {
        this.playerGroupsChangedEvent.emit();
        this.getPlayerGroups();
      });
  }

  subscribeToEventExceededMaximumBet() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'exceeded-maximum-bet')
      .subscribe(data => {
        this.exceededMaximumBetEvent.emit(data);
      });
  }

  subscribeToEventGameIsNotAllowedForBonus() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'game-is-not-allowed-for-bonus')
      .subscribe(data => {
        this.gameIsNotAllowedForBonusEvent.emit();
      });
  }

  subscribeToEventProviderAccountIsNotBonus() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'provider-account-is-not-bonus')
      .subscribe(data => {
        this.providerAccountIsNotBonusEvent.emit();
      });
  }

  subscribeToEventProviderAccountIsNotMoney() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'provider-account-is-not-money')
      .subscribe(data => {
        this.providerAccountIsNotMoneyEvent.emit();
      });
  }

  subscribeToEventPlayerEmailChanged() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-email-changed')
      .subscribe(data => {
        this.playerEmailChangedEvent.emit();
      });
  }

  subscribeToEventPlayerVerified() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'player-verified')
      .subscribe(data => {
        this.playerVerifiedEvent.emit();
      });
  }

  getPlayer() {
    this.playerDataSource.getPlayerDetails()
      .pipe(first())
      .subscribe(
        data => {
          this.player = <Player> data;
          this.playerDataReceivedEvent.emit();
        });
  }

  getPlayerAccounts() {
    this.playerDataSource
      .getPlayerAccounts()
      .pipe(first())
      .subscribe(
        data => {
          this.accounts = data;
          this.playerAccountsReceivedEvent.emit();
        });
  }

  getDefaultPlayerAccount() {
    this.playerDataSource
      .getDefaultPlayerAccount()
      .pipe(first())
      .subscribe(
        data => {
          this.defaultAccount = data;
          this.currencyCode = data.currency_code;
          this.playerDefaultAccountReceivedEvent.emit();
        });
  }

  getPointsAccount() {
    this.playerDataSource
      .getPointsAccount(
        this.identificationService.fingerprint,
        this.identificationService.getIdentifier()
      )
      .pipe(first())
      .subscribe(
        data => {
          this.pointsAccount = data;
          this.playerPointsAccountReceivedEvent.emit();
        });
  }

  getPlayerGroups() {
    this.playerDataSource
      .getPlayerGroups()
      .pipe(first())
      .subscribe(
        data => {

          const groups = data.groups;
          const groupsPublic = data.groupsPublic;

          for (const item of groupsPublic) {
            if (!this.currentPublicGroup) {
              this.currentPublicGroup = item;
            } else if (this.currentPublicGroup && (this.currentPublicGroup.id !== item.id)) {
              this.currentPublicGroup = item;
              this.newLevelEvent.emit();
            }
          }

          this.playerGroups = groups;
          this.playerGroupsPublic = groupsPublic;
          this.playerGroupsReceivedEvent.emit();
        });
  }

  setPlayerLocale(localeCode: string) {
    this.playerDataSource.setPlayerLocale(localeCode)
      .pipe(first())
      .subscribe(
        data => {
          this.playerLocaleUpdatedEvent.emit();
        });
  }

  setCurrentProgress(pointsBalance: number) {

    const currentPublicGroup = this.currentPublicGroup;
    let currentProgress = 0;
    let pointsToNextLevel = 0;

    if (!currentPublicGroup) {
      return;
    }

    const conditions = currentPublicGroup.conditions;

    for (const item of conditions) {
      if (item.name === 'ranking_points') {
        const value = JSON.parse(item.value);

        if (value == null) {
          break;
        }

        if (!('min' in value) && !('max' in value)) {
          break;
        }

        const min = parseInt(value.min, 10);
        const max = parseInt(value.max, 10);

        currentProgress = Math.floor((pointsBalance - min) / ((max - min) / 100));
        pointsToNextLevel = max - pointsBalance;
        break;
      }
    }

    this.currentProgress = currentProgress;
    this.pointsToNextLevel = pointsToNextLevel;
  }

  isIdInPlayerGroups(groupId: number) {

    const playerGroups = this.playerGroups;
    const playerGroupsPublic = this.playerGroupsPublic;

    if (!playerGroups || !playerGroupsPublic) {
      return false;
    }

    if (playerGroups.some((group: any) => group.id === groupId) || playerGroupsPublic.some((group: any) => group.id === groupId)) {
      return true;
    }

    return false;
  }

  isNameInPlayerGroups(groupName: string) {

    const playerGroups = this.playerGroups;

    if (!playerGroups) {
      return false;
    }

    if (playerGroups.some((group: any) => group.name === groupName)) {
      return true;
    }

    return false;
  }

  getCurrentGroup() {
    return this.currentPublicGroup;
  }

  getPointsToNextLevel() {
    return this.pointsToNextLevel;
  }

  getCurrentGroupName() {
    if (!this.currentPublicGroup) {
      return null;
    }
    return this.currentPublicGroup.name;
  }

  getCurrentGroupProgress() {
    return this.currentProgress;
  }

}
