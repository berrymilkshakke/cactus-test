import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-subheader-l3',
  templateUrl: './subheader-l3.component.html',
  styleUrls: ['./subheader-l3.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubheaderL3Component {
  @Input() title: string;
}
