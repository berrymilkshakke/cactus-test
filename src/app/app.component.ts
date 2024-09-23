import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {LanguagesService} from './_core/services/languages.service';
import {CookiesPolicyService} from './_core/services/cookies-policy.service';
import {SeoService} from './_core/services/seo.service';
import {RecentWinsService} from './_core/services/recent-wins.service';
import {HelperService} from './_core/services/helper.service';
import {PlayerGamesService} from './_core/services/player-games.service';
import {first} from 'rxjs/operators';
import {IdentificationService} from './_core/services/identification.service';
import {AuthGuard} from './_core/guards/auth.guard';
import {TdsDataSource} from './_core/datasources/tds.datasource';
import {AuthenticationService} from './_core/services/authentication.service';
import {ShowNotificationService} from './notifications/_services/show-notification.service';
import {ShowModalService} from './modals/_services/show-modal.service';
import {PlayerService} from './_core/services/player.service';
import {PlayerMoneyBonusesService} from './_core/services/player-money-bonuses.service';
import {PlayerFsBonusesService} from './_core/services/player-fs-bonuses.service';
import {FsBonusesService} from './_core/services/fs-bonuses.service';
import {MoneyBonusesService} from './_core/services/money-bonuses.service';
import {CurrenciesService} from './_core/services/currencies.service';
import {WebSocketService} from './_core/services/websocket.service';
import {ChatService} from './_core/services/chat.service';
import {RedirectsService} from './redirects/_services/redirects.service';
import {GamesService} from './_core/services/games.service';
import { CustomerioService } from './services/customerio.service';
import { OnesignalService } from './services/onesignal.service';
import { PushService } from './services/push.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public account: any;

  constructor(public authGuard: AuthGuard,
              public router: Router,
              public notifierService: NotifierService,
              public languagesService: LanguagesService,
              public cookiesPolicyService: CookiesPolicyService,
              public seoService: SeoService,
              public winnersService: RecentWinsService,
              public playerService: PlayerService,
              public helperService: HelperService,
              public moneyBonusesService: MoneyBonusesService,
              public fsBonusesService: FsBonusesService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public playerFsBonusesService: PlayerFsBonusesService,
              public playerGamesService: PlayerGamesService,
              public tdsDataSource: TdsDataSource,
              public identificationService: IdentificationService,
              public authenticationService: AuthenticationService,
              public showNotificationService: ShowNotificationService,
              public showModalService: ShowModalService,
              public currenciesService: CurrenciesService,
              public webSocketService: WebSocketService,
              public chatService: ChatService,
              public gamesService: GamesService,
              public redirectsService: RedirectsService,
              public customerioService: CustomerioService,
              // public pushService: PushService,
              public onesignalService: OnesignalService
            ) {

    this.account = this.playerService.defaultAccount;
    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.account = this.playerService.defaultAccount;
    });

    this.playerMoneyBonusesService.activePlayerMoneyBonusReceivedEvent.subscribe(() => {
      this.gamesService.isShowAllowedGames = true;
    });

    seoService.updateTitle();

    tdsDataSource.getTds().pipe(first());

  }
}
