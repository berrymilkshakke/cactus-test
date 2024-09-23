import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerCardComponent {
  @Input() picture: string;
  @Input() title: string;
  @Input() text: string;
  @Input() link: string;
}
