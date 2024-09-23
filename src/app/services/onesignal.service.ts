import { Injectable } from '@angular/core';
import { DomainsConfig } from '../_configs/domains.conf';
import { PlayerService } from '../_core/services/player.service';
import { AuthenticationService } from '../_core/services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  public loaded: boolean = false;

  public onesignalAppId: string;
  public playerUuid: string;

  constructor(public playerService: PlayerService,
              public authenticationService: AuthenticationService
  ) {

    this.onesignalAppId = DomainsConfig.onesignalAppId;

    if (!this.onesignalAppId) {
      return;
    }

    this.playerService.playerDataReceivedEvent.subscribe(() => {
      this.playerUuid = this.playerService.player.uuid;
      if (this.loaded) {
        this.login();
      }
    });

    authenticationService.logoutEvent.subscribe(() => {
      if (this.loaded) {
        this.logout();
      }
    });

    this.loadScript();

    if (playerService.player) {
      this.playerUuid = this.playerService.player.uuid;
      if (this.loaded) {
        this.login();
      }
    }
  }

  loadScript() {
    const that = this;

    var s = document.getElementsByTagName('script')[0];
    var t = document.createElement('script');

    t.async = true;
    t.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
    s.parentNode.insertBefore(t, s);

    (<any>window).OneSignalDeferred = (<any>window).OneSignalDeferred || [];
    (<any>window).OneSignalDeferred.push(function (OneSignal: any) {
      OneSignal.init({
        appId: that.onesignalAppId,
      });
    });

    this.loaded = true;
  }

  login() {
    const that = this;

    (<any>window).OneSignalDeferred.push(function(OneSignal: any) {
      OneSignal.login(that.playerUuid);
    });
  }

  logout() {
    (<any>window).OneSignalDeferred.push(function(OneSignal: any) {
      OneSignal.logout();
    });
  }
}
