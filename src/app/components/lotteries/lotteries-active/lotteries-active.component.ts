import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../../_core/guards/auth.guard';
import {LanguagesService} from '../../../_core/services/languages.service';
import {LotteriesPublicDataSource} from '../../../_core/datasources/lotteries-public.datasource';
import {LotteriesDataSource} from '../../../_core/datasources/lotteries.datasource';
import {PlayerService} from '../../../_core/services/player.service';
import {GuestService} from '../../../_core/services/guest.service';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-lotteries-active',
  templateUrl: './lotteries-active.component.html',
  styleUrls: ['./lotteries-active.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LotteriesActiveComponent implements OnInit {

  public lotteries: any;

  public cdnServer: any;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public lotteriesPublicDataSource: LotteriesPublicDataSource,
              public lotteriesDataSource: LotteriesDataSource,
              public playerService: PlayerService,
              public guestService: GuestService,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getLotteriesActive();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getLotteriesActivePublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getLotteriesActivePublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getLotteriesActive();
    });

    if (this.authGuard.isAuthorized()) {
      this.getLotteriesActive();
    } else {
      this.getLotteriesActivePublic();
    }
  }

  getLotteriesActive() {
    this.lotteriesDataSource.getLotteriesActive()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lotteries = data;
        });
  }

  getLotteriesActivePublic() {
    this.lotteriesPublicDataSource.getLotteriesActive()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lotteries = data;
        });
  }

}
