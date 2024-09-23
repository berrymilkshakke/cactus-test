import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-subheader-l2',
  templateUrl: './subheader-l2.component.html',
  styleUrls: ['./subheader-l2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubheaderL2Component {
  @Input() title: string;
}
