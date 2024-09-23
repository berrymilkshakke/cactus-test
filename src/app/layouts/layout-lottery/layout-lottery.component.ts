import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {LanguagesService} from '../../_core/services/languages.service';
import {LotteriesPublicDataSource} from '../../_core/datasources/lotteries-public.datasource';
import {LotteriesDataSource} from '../../_core/datasources/lotteries.datasource';
import {PlayerService} from '../../_core/services/player.service';
import {GuestService} from '../../_core/services/guest.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {first} from 'rxjs/operators';
import {LotteriesService} from '../../_core/services/lotteries.service';


@Component({
  selector: 'app-layout-lottery',
  templateUrl: './layout-lottery.component.html',
  styleUrls: ['./layout-lottery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutLotteryComponent implements OnInit {

  public lotteryId: string;
  public lottery: any;

  public cdnServer: any;

  public limitCount: number;
  public limitCountInit: number = 10;
  public limitCountMore: number = 10;

  constructor(public authGuard: AuthGuard,
              public languagesService: LanguagesService,
              public lotteriesPublicDataSource: LotteriesPublicDataSource,
              public lotteriesDataSource: LotteriesDataSource,
              public activatedRoute: ActivatedRoute,
              public playerService: PlayerService,
              public guestService: GuestService,
              public authenticationService: AuthenticationService,
              public lotteriesService: LotteriesService) {

    this.limitCount = this.limitCountInit;
    this.lotteryId = activatedRoute.snapshot.params['lotteryId'];
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getLottery(this.lotteryId);
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getLotteryPublic(this.lotteryId);
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getLotteryPublic(this.lotteryId);
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getLottery(this.lotteryId);
    });

    if (this.authGuard.isAuthorized()) {
      this.getLottery(this.lotteryId);
    } else {
      this.getLotteryPublic(this.lotteryId);
    }
  }

  getLottery(lotteryId: string) {
    this.lotteriesDataSource.getLottery(lotteryId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lottery = data;
        });
  }

  getLotteryPublic(lotteryId: string) {
    this.lotteriesPublicDataSource.getLottery(lotteryId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.lottery = data;
        });
  }

  getImagePatch(image: string) {
    return this.lotteriesService.getImagePatch(image);
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/lotteries/lottery.webp`;
  }

  onChangeLimitCount() {
    this.limitCount = this.limitCount + this.limitCountMore;
  }
}
