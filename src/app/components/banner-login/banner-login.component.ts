import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {GuestService} from '../../_core/services/guest.service';
import {PlayerService} from '../../_core/services/player.service';
import {ContentService} from '../../_core/services/content.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-banner-login',
  templateUrl: './banner-login.component.html',
  styleUrls: ['./banner-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerLoginComponent implements OnInit {

  public cdnServer: any;
  public banners: any;

  public componentName: string = 'banners-modals';

  constructor(public platformDetectorService: PlatformDetectorService,
              public guestService: GuestService,
              public playerService: PlayerService,
              public contentService: ContentService) {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  ngOnInit() {
    this.contentService.componentUpdatedEvent.subscribe((componentName: string) => {
      if (componentName === this.componentName) {
        this.banners = this.contentService.getContentJson(this.componentName);
      }
    });

    this.banners = this.contentService.getContentJson(this.componentName);
  }

  getPlatformName() {
    return this.platformDetectorService.platform;
  }

  getStyleBack(imageName: string) {
    const imagePatch = `${this.cdnServer}/main/${imageName}`;
    return {
      'background-image': `url(${imagePatch})`
    };
  }

}
