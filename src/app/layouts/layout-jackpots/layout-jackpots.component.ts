import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-jackpots',
  templateUrl: './layout-jackpots.component.html',
  styleUrls: ['./layout-jackpots.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutJackpotsComponent {

  public title: string = '';

  public menu: any = Menus.jackpotsMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
