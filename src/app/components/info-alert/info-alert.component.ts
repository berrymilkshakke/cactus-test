import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoAlertComponent {
  @Input() text: string;
  @Input() type: string;
}
