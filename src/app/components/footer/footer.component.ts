import {Component, ViewEncapsulation} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {DomainsConfig} from '../../_configs/domains.conf';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {

  public supportEmail: string;
  public affiliateEmail: string;
  public affiliateLink: string;

  public telegramLinkRu: string;
  public telegramLinkPl: string;
  public telegramLink: string;
  public telegramLinkIt: string;
  public telegramLinkUk: string;

  public companyDescription: string;
  public isShowLicense: boolean = false;

  constructor(private viewportScroller: ViewportScroller,
              public languagesService: LanguagesService) {

    this.supportEmail = DomainsConfig.supportEmail;

    this.affiliateEmail = DomainsConfig.affiliateEmail;
    this.affiliateLink = DomainsConfig.affiliateLink;

    this.telegramLinkRu = DomainsConfig.telegramLinkRu;
    this.telegramLinkPl = DomainsConfig.telegramLinkPl;
    this.telegramLink = DomainsConfig.telegramLink;
    this.telegramLinkIt = DomainsConfig.telegramLinkIt;
    this.telegramLinkUk = DomainsConfig.telegramLinkUk;

    this.companyDescription = DomainsConfig.companyDescription;
    this.isShowLicense = DomainsConfig.isShowLicense;
  }

  toTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
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
