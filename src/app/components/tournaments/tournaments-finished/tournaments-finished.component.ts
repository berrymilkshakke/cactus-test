import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../../_core/guards/auth.guard';
import {LanguagesService} from '../../../_core/services/languages.service';
import {TournamentsService} from '../../../_core/services/tournaments.service';
import {TournamentsPublicDataSource} from '../../../_core/datasources/tournaments-public.datasource';
import {TournamentsDataSource} from '../../../_core/datasources/tournaments.datasource';
import {GuestService} from '../../../_core/services/guest.service';
import {PlayerService} from '../../../_core/services/player.service';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-tournaments-finished',
  templateUrl: './tournaments-finished.component.html',
  styleUrls: ['./tournaments-finished.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TournamentsFinishedComponent implements OnInit {

  public tournaments: any;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public tournamentsService: TournamentsService,
              public tournamentsPublicDataSource: TournamentsPublicDataSource,
              public tournamentsDataSource: TournamentsDataSource,
              public guestService: GuestService,
              public playerService: PlayerService,
              public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getTournamentsFinished();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getTournamentsFinishedPublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsFinishedPublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsFinished();
    });

    if (this.authGuard.isAuthorized()) {
      this.getTournamentsFinished();
    } else {
      this.getTournamentsFinishedPublic();
    }
  }

  getTournamentsFinished() {
    this.tournamentsDataSource.getTournamentsFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.tournaments = data;
        });
  }

  getTournamentsFinishedPublic() {
    this.tournamentsPublicDataSource.getTournamentsFinished()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.tournaments = data;
        });
  }

  getImagePatch(image: string) {
    return this.tournamentsService.getImagePatch(image);
  }
}
