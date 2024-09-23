import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutProfileComponent {

  public title: string = '';

  public menu: any = Menus.profileMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
