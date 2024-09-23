import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-lotteries',
  templateUrl: './layout-lotteries.component.html',
  styleUrls: ['./layout-lotteries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutLotteriesComponent {

  public title: string = '';

  public menu: any = Menus.lotteriesMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
