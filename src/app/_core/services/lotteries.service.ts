import {Injectable} from '@angular/core';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({
  providedIn: 'root'
})
export class LotteriesService {

  public cdnServer: any;
  public lotteries: any;

  constructor() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/lotteries/${imageName}`;
  }

  getBlankImagePatch() {
    return `${this.cdnServer}/tournaments/default.jpg`;
  }
}
