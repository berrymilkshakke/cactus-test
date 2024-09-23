import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {interval} from 'rxjs';
import {PlatformDetectorService} from './platform-detector.service';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {WinsPublicSource} from '../datasources/wins-public.datasource';
import {SystemConfig} from '../../_configs/system.conf';
import {AuthGuard} from '../guards/auth.guard';
import {GuestService} from './guest.service';
import {PlayerService} from './player.service';


@Injectable({
  providedIn: 'root'
})
export class RecentWinsService {

  public recentWins: {};

  @Output() public recentWinsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public winsPublicSource: WinsPublicSource,
              public gamesService: GamesService,
              public platformDetectorService: PlatformDetectorService,
              public webSocketService: WebSocketService,
              public authGuard: AuthGuard,
              public echoService: EchoService,
              public guestService: GuestService,
              public playerService: PlayerService,
  ) {

    gamesService.gamesReceivedEvent.subscribe(() => {
      this.getRecentWinsWithCheck();
    });

    playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.getRecentWinsWithCheck();
    });

    guestService.guestDataReceivedEvent.subscribe(() => {
      this.getRecentWinsWithCheck();
    });

    webSocketService.connectedEvent.subscribe(() => {
      this.subscribeToEventRecentWinsUpdated();
    });

    const that = this;
    interval(60 * 1000).subscribe(x => {
      that.getRecentWinsWithCheck();
    });
  }

  getRecentWinsWithCheck() {
    const recentWinsByCurrency = SystemConfig.recentWinsByCurrency;

    if (!recentWinsByCurrency) {
      this.getRecentWins();
    } else {
      if (this.authGuard.isAuthorized()) {
        if (this.playerService.currencyCode) {
          this.getRecentWinsByCurrency(this.playerService.currencyCode);
        }
      } else {
        if (this.guestService.currencyCode) {
          this.getRecentWinsByCurrency(this.guestService.currencyCode);
        }
      }
    }
  }

  subscribeToEventRecentWinsUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'recent-wins-updated')
      .subscribe(data => {
        this.getRecentWinsWithCheck();
      });
  }

  getRecentWins() {
    this.winsPublicSource.getRecentWins(this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {

          const winsArray = [];
          let index;
          for (index in data) {
            const game = this.gamesService.getGameById(data[index].game_id);
            if (game != null) {
              const win = data[index];
              win.game = game;
              winsArray.push(win);
            }
          }

          this.recentWins = winsArray;
          this.recentWinsReceivedEvent.emit();
        });
  }

  getRecentWinsByCurrency(currencyCode: string) {
    this.winsPublicSource.getRecentWinsByCurrency(this.platformDetectorService.platform, currencyCode)
      .pipe(first())
      .subscribe(
        data => {

          const winsArray = [];
          let index;
          for (index in data) {
            const game = this.gamesService.getGameById(data[index].game_id);
            if (game != null) {
              const win = data[index];
              win.game = game;
              winsArray.push(win);
            }
          }

          this.recentWins = winsArray;
          this.recentWinsReceivedEvent.emit();
        });
  }

}
