import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-subheader-l1',
  templateUrl: './subheader-l1.component.html',
  styleUrls: ['./subheader-l1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubheaderL1Component {
  @Input() title: string;
}
