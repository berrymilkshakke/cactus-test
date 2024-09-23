import {Injectable, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {AuthGuard} from '../guards/auth.guard';
import {EchoService} from 'ngx-laravel-echo';
import {GuestService} from './guest.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private privateName = 'players';

  public publicChannelName = 'public';
  public privateChannelName = 'players';

  @Output() public connectedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public authenticationService: AuthenticationService,
              public authGuard: AuthGuard,
              public echoService: EchoService,
              public guestService: GuestService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.unsubscribeFromPublicGuest();

      const user = authGuard.getUserData();
      if (user) {
        this.subscribeToPrivate(user.id, user.token);
      }
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.unsubscribeFromPrivate();

      if (guestService.guestId) {
        this.subscribeToPublicGuest();
      }
    });

    guestService.guestDataReceivedEvent.subscribe(() => {
      this.subscribeToPublicGuest();
    });

    echoService.connectionState.subscribe(data => {
      if (data === true) {
        this.connectedEvent.emit();
      }
    });

    const currentUser = authGuard.getUserData();
    if (currentUser) {
      this.subscribeToPrivate(currentUser.id, currentUser.token);
    }

    if (!authGuard.isAuthorized() && (guestService.guestId)) {
      this.subscribeToPublicGuest();
    }

    this.subscribeToPublic();
  }

  subscribeToPrivate(userId: number, token: string) {
    this.privateChannelName = `${this.privateName}.${userId}`;

    this.echoService.login({Authorization: `Bearer ${token}`}, userId);
    this.echoService.join(this.privateChannelName, 'private');
  }

  unsubscribeFromPrivate() {
    this.echoService.logout();
  }

  subscribeToPublicGuest() {
    this.echoService.join(this.guestService.guestId, 'public');
  }

  unsubscribeFromPublicGuest() {
    this.echoService.leave(this.guestService.guestId);
  }

  subscribeToPublic() {
    this.echoService.join(this.publicChannelName, 'public');
  }
}
