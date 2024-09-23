import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerService} from '../../_core/services/player.service';
import {GuestService} from '../../_core/services/guest.service';
import {TournamentsPublicDataSource} from '../../_core/datasources/tournaments-public.datasource';
import {TournamentsDataSource} from '../../_core/datasources/tournaments.datasource';
import {LanguagesService} from '../../_core/services/languages.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {first} from 'rxjs/operators';
import {JackpotsPublicDataSource} from '../../_core/datasources/jackpots-public.datasource';
import {JackpotsDataSource} from '../../_core/datasources/jackpots.datasource';
import {LotteriesPublicDataSource} from '../../_core/datasources/lotteries-public.datasource';
import {LotteriesDataSource} from '../../_core/datasources/lotteries.datasource';
import {DomainsConfig} from '../../_configs/domains.conf';
import {GamesService} from '../../_core/services/games.service';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';


@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutHomeComponent implements OnInit {

  public tournaments: any;
  public lotteries: any;
  public jackpots: any;

  public isShowLiveCategory: boolean = false;

  constructor(public authGuard: AuthGuard,
              public playerService: PlayerService,
              public guestService: GuestService,
              public tournamentsPublicDataSource: TournamentsPublicDataSource,
              public tournamentsDataSource: TournamentsDataSource,
              public languagesService: LanguagesService,
              public jackpotsPublicDataSource: JackpotsPublicDataSource,
              public jackpotsDataSource: JackpotsDataSource,
              public lotteriesPublicDataSource: LotteriesPublicDataSource,
              public lotteriesDataSource: LotteriesDataSource,
              public gamesService: GamesService,
              public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public authenticationService: AuthenticationService) {
    this.isShowLiveCategory = DomainsConfig.isShowLiveCategory;
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getTournamentsActive();
      this.getLotteriesActive();
      this.getJackpotsActive();
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getTournamentsActivePublic();
      this.getLotteriesActivePublic();
      this.getJackpotsActivePublic();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsActivePublic();
      this.getLotteriesActivePublic();
      this.getJackpotsActivePublic();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getTournamentsActive();
      this.getLotteriesActive();
      this.getJackpotsActive();
    });

    if (this.authGuard.isAuthorized()) {
      this.getTournamentsActive();
      this.getLotteriesActive();
      this.getJackpotsActive();
    } else {
      this.getTournamentsActivePublic();
      this.getLotteriesActivePublic();
      this.getJackpotsActivePublic();
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

  isShowAllowedGames() {
    if (!this.playerMoneyBonusesService.activeBonus) {
      return false;
    }

    return this.gamesService.isShowAllowedGames;
  }
  
  isAuthorized() {
    return this.authGuard.isAuthorized();
  }
}
