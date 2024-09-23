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
  selector: 'app-lotteries-finished',
  templateUrl: './lotteries-finished.component.html',
  styleUrls: ['./lotteries-finished.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LotteriesFinishedComponent implements OnInit {

  public lotteries: any;

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
      this.getLotteriesFinished();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getLotteriesFinishedPublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getLotteriesFinishedPublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getLotteriesFinished();
    });

    if (this.authGuard.isAuthorized()) {
      this.getLotteriesFinished();
    } else {
      this.getLotteriesFinishedPublic();
    }
  }

  getLotteriesFinished() {
    this.lotteriesDataSource.getLotteriesFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lotteries = data;
        });
  }

  getLotteriesFinishedPublic() {
    this.lotteriesPublicDataSource.getLotteriesFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lotteries = data;
        });
  }

}
