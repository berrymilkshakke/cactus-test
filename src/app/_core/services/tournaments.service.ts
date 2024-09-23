import {EventEmitter, Injectable, Output} from '@angular/core';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  public cdnServer: any;
  public tournaments: any;

  @Output() public tournamentsUpdatedEvent: EventEmitter<object> = new EventEmitter();

  constructor() {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/tournaments/${imageName}`;
  }

  getBlankImagePatch() {
    return `${this.cdnServer}/tournaments/default.jpg`;
  }
}
