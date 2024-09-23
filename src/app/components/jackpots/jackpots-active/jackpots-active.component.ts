import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../../_core/guards/auth.guard';
import {PlayerService} from '../../../_core/services/player.service';
import {JackpotsPublicDataSource} from '../../../_core/datasources/jackpots-public.datasource';
import {GuestService} from '../../../_core/services/guest.service';
import {JackpotsDataSource} from '../../../_core/datasources/jackpots.datasource';
import {LanguagesService} from '../../../_core/services/languages.service';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from 'rxjs/operators';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-jackpots-active',
  templateUrl: './jackpots-active.component.html',
  styleUrls: ['./jackpots-active.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JackpotsActiveComponent implements OnInit {

  public jackpots: any;

  public cdnServer: any;

  constructor(public authGuard: AuthGuard,
              public playerService: PlayerService,
              public guestService: GuestService,
              public jackpotsPublicDataSource: JackpotsPublicDataSource,
              public jackpotsDataSource: JackpotsDataSource,
              public languagesService: LanguagesService,
              public authenticationService: AuthenticationService) {

    this.cdnServer = DomainsConfig.cdnServer;
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getJackpotsActive();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getJackpotsActivePublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getJackpotsActivePublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getJackpotsActive();
    });

    if (this.authGuard.isAuthorized()) {
      this.getJackpotsActive();
    } else {
      this.getJackpotsActivePublic();
    }
  }

  getJackpotsActive() {
    this.jackpotsDataSource.getJackpotsActive()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.jackpots = data;
        });
  }

  getJackpotsActivePublic() {
    this.jackpotsPublicDataSource.getJackpotsActive()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.jackpots = data;
        });
  }
}
