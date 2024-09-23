import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../../_core/guards/auth.guard';
import {LanguagesService} from '../../../_core/services/languages.service';
import {JackpotsPublicDataSource} from '../../../_core/datasources/jackpots-public.datasource';
import {GuestService} from '../../../_core/services/guest.service';
import {PlayerService} from '../../../_core/services/player.service';
import {JackpotsDataSource} from '../../../_core/datasources/jackpots.datasource';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-jackpots-finished',
  templateUrl: './jackpots-finished.component.html',
  styleUrls: ['./jackpots-finished.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JackpotsFinishedComponent implements OnInit {

  public jackpots: any;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public jackpotsPublicDataSource: JackpotsPublicDataSource,
              public jackpotsDataSource: JackpotsDataSource,
              public playerService: PlayerService,
              public guestService: GuestService,
              public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getJackpotsFinished();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getJackpotsFinishedPublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getJackpotsFinishedPublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getJackpotsFinished();
    });

    if (this.authGuard.isAuthorized()) {
      this.getJackpotsFinished();
    } else {
      this.getJackpotsFinishedPublic();
    }
  }

  getJackpotsFinished() {
    this.jackpotsDataSource.getJackpotsFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.jackpots = data;
        });
  }

  getJackpotsFinishedPublic() {
    this.jackpotsPublicDataSource.getJackpotsFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.jackpots = data;
        });
  }
}
