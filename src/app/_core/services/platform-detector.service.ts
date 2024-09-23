import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';


@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {

  public platform: string;

  constructor(public deviceDetectorService: DeviceDetectorService) {
    let platform;
    if (deviceDetectorService.isMobile()) {
      platform = 'mobile';
    } else if (deviceDetectorService.isTablet()) {
      platform = 'tablet';
    } else if (deviceDetectorService.isDesktop()) {
      platform = 'desktop';
    }
    this.platform = platform;
  }

}
