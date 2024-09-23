import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../../_core/guards/auth.guard';
import {GuestService} from '../../../_core/services/guest.service';
import {LanguagesService} from '../../../_core/services/languages.service';
import {TournamentsService} from '../../../_core/services/tournaments.service';
import {TournamentsPublicDataSource} from '../../../_core/datasources/tournaments-public.datasource';
import {TournamentsDataSource} from '../../../_core/datasources/tournaments.datasource';
import {PlayerService} from '../../../_core/services/player.service';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-tournaments-active',
  templateUrl: './tournaments-active.component.html',
  styleUrls: ['./tournaments-active.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TournamentsActiveComponent implements OnInit {

  public tournaments: any;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public guestService: GuestService,
              public tournamentsService: TournamentsService,
              public tournamentsPublicDataSource: TournamentsPublicDataSource,
              public tournamentsDataSource: TournamentsDataSource,
              public playerService: PlayerService,
              public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getTournamentsActive();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getTournamentsActivePublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsActivePublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsActive();
    });

    if (this.authGuard.isAuthorized()) {
      this.getTournamentsActive();
    } else {
      this.getTournamentsActivePublic();
    }
  }

  getTournamentsActive() {
    this.tournamentsDataSource.getTournamentsActive()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.tournaments = data;
        });
  }

  getTournamentsActivePublic() {
    this.tournamentsPublicDataSource.getTournamentsActive()
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
