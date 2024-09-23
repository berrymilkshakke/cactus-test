import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-policies',
  templateUrl: './layout-policies.component.html',
  styleUrls: ['./layout-policies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutPoliciesComponent {

  public title: string = '';

  public menu: any = Menus.policiesMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
