import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MoneyBonusesService} from '../../../_core/services/money-bonuses.service';
import {FsBonusesService} from '../../../_core/services/fs-bonuses.service';
import {LanguagesService} from '../../../_core/services/languages.service';


@Component({
  selector: 'app-bonuses-get',
  templateUrl: './bonuses-available.component.html',
  styleUrls: ['./bonuses-available.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusesAvailableComponent implements OnInit {

  @Output() closeEvent: any = new EventEmitter();

  public moneyBonuses: any = [];
  public fsBonuses: any = [];

  constructor(public moneyBonusesService: MoneyBonusesService,
              public fsBonusesService: FsBonusesService,
              public languagesService: LanguagesService) {
  }

  ngOnInit() {

    this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    this.moneyBonusesService.moneyBonusesUpdatedEvent.subscribe((data: any) => {
      this.moneyBonuses = this.moneyBonusesService.moneyBonuses;
    });

    this.fsBonuses = this.fsBonusesService.fsBonuses;
    this.fsBonusesService.fsBonusesUpdatedEvent.subscribe((data: any) => {
      this.fsBonuses = this.fsBonusesService.fsBonuses;
    });

    this.moneyBonusesService.getBonuses();
    this.fsBonusesService.getBonuses();
  }
}
