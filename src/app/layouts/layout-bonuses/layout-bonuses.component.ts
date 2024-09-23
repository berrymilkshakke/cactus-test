import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-bonuses',
  templateUrl: './layout-bonuses.component.html',
  styleUrls: ['./layout-bonuses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutBonusesComponent {

  public title: string = '';

  public menu: any = Menus.bonusesMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
