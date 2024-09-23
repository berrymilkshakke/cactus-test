import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerFsBonusesDataSource} from '../../../../_core/datasources/player-fs-bonuses.datasource';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-bonuses-history-fs',
  templateUrl: './bonuses-history-fs.component.html',
  styleUrls: ['./bonuses-history-fs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusesHistoryFsComponent implements OnInit {

  public playerFsBonuses: any;

  constructor(public playerFsBonusesDataSource: PlayerFsBonusesDataSource) {
  }

  ngOnInit() {
    this.getPlayerMoneyBonusesHistory();
  }

  getPlayerMoneyBonusesHistory() {
    this.playerFsBonusesDataSource.getFsBonusesHistory()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.playerFsBonuses = data;
        });
  }
}
