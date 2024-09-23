import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoBackComponent {
  @Input() title: string;
}
