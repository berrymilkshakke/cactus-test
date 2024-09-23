import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WarningComponent {
  @Input() warningText: string;
}
