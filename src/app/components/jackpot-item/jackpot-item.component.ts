import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-jackpot-item',
  templateUrl: './jackpot-item.component.html',
  styleUrls: ['./jackpot-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JackpotItemComponent {

  @Input() public jackpot: any;
}
