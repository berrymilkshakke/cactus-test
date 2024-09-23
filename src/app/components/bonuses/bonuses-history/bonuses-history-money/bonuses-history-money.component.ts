import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {first} from 'rxjs/operators';
import {PlayerMoneyBonusesDataSource} from '../../../../_core/datasources/player-money-bonuses.datasource';


@Component({
  selector: 'app-profile-bonuses-history-money',
  templateUrl: './bonuses-history-money.component.html',
  styleUrls: ['./bonuses-history-money.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusesHistoryMoneyComponent implements OnInit {

  public playerMoneyBonuses: any;

  constructor(public playerMoneyBonusesDataSource: PlayerMoneyBonusesDataSource) {
  }

  ngOnInit() {
    this.getPlayerMoneyBonusesHistory();
  }

  getPlayerMoneyBonusesHistory() {
    this.playerMoneyBonusesDataSource.getMoneyBonusesHistory()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.playerMoneyBonuses = data;
        });
  }


}
