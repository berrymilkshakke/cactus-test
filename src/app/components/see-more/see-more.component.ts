import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeeMoreComponent {

  @Input() url: string = '#';
  @Input() title: string = 'buttons.show_next';
}
