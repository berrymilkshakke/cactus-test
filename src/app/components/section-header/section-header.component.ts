import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionHeaderComponent {

  @Input() type: string|null;
  @Input() title: string;
  @Input() seeMoreUrl: string|null;
  @Input() pageName: string;
}
