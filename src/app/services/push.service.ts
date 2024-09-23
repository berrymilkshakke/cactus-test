import { Injectable } from '@angular/core';
import { DomainsConfig } from '../_configs/domains.conf';
import { PlayerService } from '../_core/services/player.service';
import { OneSignal } from 'onesignal-ngx';


@Injectable({
  providedIn: 'root'
})
export class PushService {

  public onesignalAppId: string;

  constructor(public playerService: PlayerService,
    public oneSignal: OneSignal
  ) {

    this.onesignalAppId = DomainsConfig.onesignalAppId;

    if (!this.onesignalAppId) {
      return;
    }

    this.oneSignal.init({
      appId: this.onesignalAppId,
    }).then(() => {
      console.log('OnesignalService initiated.');
    });
  }
}
