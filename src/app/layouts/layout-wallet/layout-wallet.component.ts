import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Menus} from '../../menus';


@Component({
  selector: 'app-layout-wallet',
  templateUrl: './layout-wallet.component.html',
  styleUrls: ['./layout-wallet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutWalletComponent {

  public title: string = '';

  public menu: any = Menus.walletMenu;

  constructor(public titleService: Title) {

    this.titleService.setTitle(this.title);
  }

}
