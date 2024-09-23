import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TournamentsService} from '../../_core/services/tournaments.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerService} from '../../_core/services/player.service';
import {LanguagesService} from '../../_core/services/languages.service';
import {AuthenticationService} from '../../_core/services/authentication.service';


@Component({
  selector: 'app-tournament-item',
  templateUrl: './tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TournamentItemComponent {

  @Input() tournament: any;
  @Input() pageName: string;

  constructor(public tournamentsService: TournamentsService,
              public authGuard: AuthGuard,
              public playerService: PlayerService,
              public languagesService: LanguagesService,
              public authenticationService: AuthenticationService) {
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/tournaments/tournament.webp`;
  }

  getImagePatch(image: string) {
    return this.tournamentsService.getImagePatch(image);
  }
}
