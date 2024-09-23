import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../../_core/services/player.service';
import {SystemConfig} from '../../_configs/system.conf';


@Component({
  selector: 'app-bonus-item-currencies-value',
  templateUrl: './bonus-item-currencies-value.component.html',
  styleUrls: ['./bonus-item-currencies-value.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusItemCurrenciesValueComponent implements OnInit {

  @Input() public title: string;
  @Input() public values: any;
  @Input() public style: string;

  public defaultCurrencyCode;

  constructor(public playerService: PlayerService) {
  }

  ngOnInit() {
    this.defaultCurrencyCode = SystemConfig.defaultCurrencyCode;
  }

  getPlayerCurrencyCode() {
    return this.playerService.currencyCode;
  }
}
