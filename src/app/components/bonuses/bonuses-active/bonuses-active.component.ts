import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PlayerMoneyBonusesService} from '../../../_core/services/player-money-bonuses.service';
import {PlayerFsBonusesService} from '../../../_core/services/player-fs-bonuses.service';
import {LanguagesService} from '../../../_core/services/languages.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-bonuses-active',
  templateUrl: './bonuses-active.component.html',
  styleUrls: ['./bonuses-active.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusesActiveComponent implements OnInit {

  @Output() closeEvent: any = new EventEmitter();

  public playerMoneyBonuses: any;
  public playerFsBonuses: any;

  public interval: any;

  constructor(public playerMoneyBonusesService: PlayerMoneyBonusesService,
              public playerFsBonusesService: PlayerFsBonusesService,
              public languagesService: LanguagesService,
              public router: Router) {
  }

  ngOnInit() {
    this.playerMoneyBonuses = this.playerMoneyBonusesService.playerMoneyBonuses;
    this.playerMoneyBonusesService.playerMoneyBonusesUpdatedEvent.subscribe((data: any) => {
      this.playerMoneyBonuses = this.playerMoneyBonusesService.playerMoneyBonuses;
      this.checkRedirect();
    });

    this.playerFsBonuses = this.playerFsBonusesService.playerFsBonuses;
    this.playerFsBonusesService.playerFsBonusesUpdatedEvent.subscribe((data: any) => {
      this.playerFsBonuses = this.playerFsBonusesService.playerFsBonuses;
      this.checkRedirect();
    });

    this.playerMoneyBonusesService.getPlayerMoneyBonuses();
    this.playerFsBonusesService.getPlayerFsBonuses();

    this.checkRedirect();
  }

  checkRedirect() {
    if ((this.playerMoneyBonuses && this.playerFsBonuses) &&
      (this.playerMoneyBonuses.length === 0 && this.playerFsBonuses.length === 0)
    ) {
      setTimeout(() => {
        if ((this.playerMoneyBonuses && this.playerFsBonuses) &&
          (this.playerMoneyBonuses.length === 0 && this.playerFsBonuses.length === 0)
        ) {
          if (this.router.url === '/bonuses/active') {
            this.router.navigate(['/bonuses/available']);
          }
        }
      }, 2 * 1000);
    }
  }
}
