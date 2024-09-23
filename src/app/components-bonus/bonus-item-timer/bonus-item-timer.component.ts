import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Helper} from '../../_core/classes/helper';


@Component({
  selector: 'app-bonus-item-timer',
  templateUrl: './bonus-item-timer.component.html',
  styleUrls: ['./bonus-item-timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusItemTimerComponent implements OnInit {

  @Input() public seconds: number;

  public interval: number;

  constructor() {
  }

  ngOnInit() {
    this.setInterval();
  }

  setInterval() {
    this.interval = setInterval(() => {
      if (this.seconds < 1) {
        clearInterval(this.interval);
      }
      this.seconds -= 1;
    }, 1 * 1000);
  }

  getElapsedTime(seconds: number) {
    return Helper.getElapsedTime(seconds);
  }

}
