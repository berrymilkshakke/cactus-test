import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {Router} from '@angular/router';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {GuestService} from '../../_core/services/guest.service';
import {PlayerService} from '../../_core/services/player.service';
import {ContentService} from '../../_core/services/content.service';
import {DomainsConfig} from '../../_configs/domains.conf';


@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannersComponent implements OnInit {

  public bannersNotAuthorized: any;
  public bannersAuthorized: any;
  public cdnServer: any;

  public slideConfig: any = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    arrows: false,
    dots: true,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  public componentBannersAuthorized: string = 'banners-authorized';
  public componentBannersNotAuthorized: string = 'banners-not-authorized';

  constructor(public authGuard: AuthGuard,
              public router: Router,
              public platformDetectorService: PlatformDetectorService,
              public authenticationService: AuthenticationService,
              public guestService: GuestService,
              public contentService: ContentService,
              public playerService: PlayerService) {

    this.cdnServer = DomainsConfig.cdnServer;
  }

  navigateToLink(url: string, target: string) {
    window.open(url, target);
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.contentService.updateContentJson(this.componentBannersAuthorized);
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.contentService.updateContentJson(this.componentBannersNotAuthorized);
    });

    this.contentService.componentUpdatedEvent.subscribe((componentName: string) => {
      if (componentName === this.componentBannersAuthorized) {
        this.bannersAuthorized = this.contentService.getContentJson(this.componentBannersAuthorized);
      } else if (componentName === this.componentBannersNotAuthorized) {
        this.bannersNotAuthorized = this.contentService.getContentJson(this.componentBannersNotAuthorized);
      }
    });

    if (this.authGuard.isAuthorized()) {
      this.bannersAuthorized = this.contentService.getContentJson(this.componentBannersAuthorized);
    } else {
      this.bannersNotAuthorized = this.contentService.getContentJson(this.componentBannersNotAuthorized);
    }
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  getPlatform() {
    return this.platformDetectorService.platform;
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/main/${imageName}`;
  }
}
