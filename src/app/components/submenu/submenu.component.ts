import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmenuComponent {
  @Input() items: any;
}
