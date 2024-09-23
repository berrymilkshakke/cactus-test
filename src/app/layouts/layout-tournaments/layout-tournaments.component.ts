import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-tournaments',
  templateUrl: './layout-tournaments.component.html',
  styleUrls: ['./layout-tournaments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutTournamentsComponent {

  public title: string = '';

  public menu: any = Menus.tournamentsMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
