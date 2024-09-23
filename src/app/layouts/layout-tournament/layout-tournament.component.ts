import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {LanguagesService} from '../../_core/services/languages.service';
import {TournamentsPublicDataSource} from '../../_core/datasources/tournaments-public.datasource';
import {TournamentsDataSource} from '../../_core/datasources/tournaments.datasource';
import {PlayerService} from '../../_core/services/player.service';
import {GuestService} from '../../_core/services/guest.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {first} from 'rxjs/operators';
import {TournamentsService} from '../../_core/services/tournaments.service';


@Component({
  selector: 'app-layout-tournament',
  templateUrl: './layout-tournament.component.html',
  styleUrls: ['./layout-tournament.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutTournamentComponent implements OnInit {

  public tournamentId: string;
  public tournament: any;

  public cdnServer: any;

  public limitCount: number;
  public limitCountInit: number = 10;
  public limitCountMore: number = 10;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public tournamentsPublicDataSource: TournamentsPublicDataSource,
              public tournamentsDataSource: TournamentsDataSource,
              public activatedRoute: ActivatedRoute,
              public playerService: PlayerService,
              public guestService: GuestService,
              public authenticationService: AuthenticationService,
              public tournamentsService: TournamentsService) {

    this.limitCount = this.limitCountInit;
    this.tournamentId = activatedRoute.snapshot.params['tournamentId'];
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getTournament(this.tournamentId);
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getTournamentPublic(this.tournamentId);
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentPublic(this.tournamentId);
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getTournament(this.tournamentId);
    });

    if (this.authGuard.isAuthorized()) {
      this.getTournament(this.tournamentId);
    } else {
      this.getTournamentPublic(this.tournamentId);
    }
  }

  getTournament(tournamentId: string) {
    this.tournamentsDataSource.getTournament(tournamentId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.tournament = data;
        });
  }

  getTournamentPublic(tournamentId: string) {
    this.tournamentsPublicDataSource.getTournament(tournamentId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.tournament = data;
        });
  }

  getImagePatch(image: string) {
    return this.tournamentsService.getImagePatch(image);
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/tournaments/tournament.webp`;
  }

  onChangeLimitCount() {
    this.limitCount = this.limitCount + this.limitCountMore;
  }
}
