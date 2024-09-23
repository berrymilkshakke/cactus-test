import {Component, Input, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-jackpot-finished-item',
  templateUrl: './jackpot-finished-item.component.html',
  styleUrls: ['./jackpot-finished-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JackpotFinishedItemComponent {

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
