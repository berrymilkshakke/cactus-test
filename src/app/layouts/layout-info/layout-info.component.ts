import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-info',
  templateUrl: './layout-info.component.html',
  styleUrls: ['./layout-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutInfoComponent {

  public title: string = '';

  public menu: any = Menus.infoMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
