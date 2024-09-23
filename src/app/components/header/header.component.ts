import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {PlayerService} from '../../_core/services/player.service';
import {ContentService} from '../../_core/services/content.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input() hasLogin: boolean = false;

  backdrop: any;

  sliderOpened: boolean = false;

  public account: any;
  public banners: any;

  public componentName: string = 'banners-modals';

  public affiliateEmail: string;
  public affiliateLink: string;

  public telegramLinkRu: string;
  public telegramLinkPl: string;
  public telegramLink: string;
  public telegramLinkIt: string;
  public telegramLinkUk: string;

  constructor(private viewportScroller: ViewportScroller,
              public showModalService: ShowModalService,
              public authGuard: AuthGuard,
              public playerService: PlayerService,
              public languagesService: LanguagesService,
              public authenticationService: AuthenticationService,
              public contentService: ContentService) {

    this.affiliateEmail = DomainsConfig.affiliateEmail;
    this.affiliateLink = DomainsConfig.affiliateLink;

    this.telegramLinkRu = DomainsConfig.telegramLinkRu;
    this.telegramLinkPl = DomainsConfig.telegramLinkPl;
    this.telegramLink = DomainsConfig.telegramLink;
    this.telegramLinkIt = DomainsConfig.telegramLinkIt;
    this.telegramLinkUk = DomainsConfig.telegramLinkUk;

    this.account = this.playerService.defaultAccount;
    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.account = this.playerService.defaultAccount;
    });
  }

  ngOnInit() {
    this.contentService.componentUpdatedEvent.subscribe((componentName: string) => {
      if (componentName === this.componentName) {
        this.banners = this.contentService.getContentJson(this.componentName);
      }
    });

    this.banners = this.contentService.getContentJson(this.componentName);
  }

  toTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  openSlider() {
    this.sliderOpened = true;
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop show';
    this.backdrop.addEventListener('click', this.closeSlider.bind(this));
    document.body.appendChild(this.backdrop);
  }

  closeSlider() {
    this.sliderOpened = false;
    document.body.removeChild(this.backdrop);
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  logout() {
    this.authenticationService.logout();
  }

  getLogin() {
    if (this.playerService.player) {
      return this.playerService.player.email;
    }
  }

  getTelegramLink() {
    const currentLanguageCode = this.languagesService.currentLanguageCode;

    if (currentLanguageCode === 'ru') {
      return this.telegramLinkRu;
    } else if (currentLanguageCode === 'pl') {
      return this.telegramLinkPl;
    } else if (currentLanguageCode === 'it') {
        return this.telegramLinkIt;
    } else if (currentLanguageCode === 'uk') {
      return this.telegramLinkUk;
    } else {
      return this.telegramLink;
    }
  }
}
