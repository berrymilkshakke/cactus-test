import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {WinsPublicSource} from '../datasources/wins-public.datasource';
import {AuthGuard} from '../guards/auth.guard';
import {GuestService} from './guest.service';
import {PlayerService} from './player.service';


@Injectable({
  providedIn: 'root'
})
export class TopWinsService {

  public topWins: [];

  @Output() public topWinsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public winsPublicSource: WinsPublicSource,
              public gamesService: GamesService,
              public webSocketService: WebSocketService,
              public authGuard: AuthGuard,
              public echoService: EchoService,
              public guestService: GuestService,
              public playerService: PlayerService,
  ) {

    gamesService.gamesReceivedEvent.subscribe(() => {
      this.getTopWins();
    });
  }

  getTopWins() {
    this.winsPublicSource.getTopWins()
      .pipe(first())
      .subscribe(
        data => {
          this.topWins = data;
          this.topWinsReceivedEvent.emit();
        });
  }

}
