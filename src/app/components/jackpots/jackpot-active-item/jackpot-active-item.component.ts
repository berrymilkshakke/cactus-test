import {Component, Input, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-jackpot-active-item',
  templateUrl: './jackpot-active-item.component.html',
  styleUrls: ['./jackpot-active-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JackpotActiveItemComponent {

  @Input() jackpot: any;

  public cdnServer: any;

  constructor() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  getStyleBack(imageName: string) {
    const imagePatch = `${this.cdnServer}/jackpots/${imageName}`;
    return {
      'background-image': `url(${imagePatch})`
    };
  }
}
