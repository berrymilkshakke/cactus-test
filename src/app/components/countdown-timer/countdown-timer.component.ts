import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Helper} from '../../_core/classes/helper';


@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountdownTimerComponent implements OnInit {

  @Input() public seconds: number;

  public interval: any;

  constructor() {
  }

  ngOnInit() {
    this.setInterval();
  }

  setInterval() {
    this.interval = setInterval(() => {
      if (this.seconds < 1) {
        clearInterval(this.interval);
        return;
      }
      this.seconds -= 1;
    }, 1 * 1000);
  }

  getElapsedTime(seconds: number) {
    return Helper.getElapsedTime(seconds);
  }

}
