import { Injectable } from '@angular/core';
import { DomainsConfig } from '../_configs/domains.conf';
import { PlayerService } from '../_core/services/player.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerioService {

  public loaded: boolean = false;

  public customerioSiteId: string;

  constructor(public playerService: PlayerService) {

    this.customerioSiteId = DomainsConfig.customerioSiteId;

    if (!this.customerioSiteId) {
      return;
    }

    this.playerService.playerDataReceivedEvent.subscribe(() => {
      if (this.loaded) {
        this.setId();
      }
    });

    this.loadScript();

    if (playerService.player) {
      if (this.loaded) {
        this.setId();
      }
    }
  }

  loadScript() {
    (<any>window)._cio = (<any>window)._cio || [];

    var a: any, b: any, c: any; a = function (f: any) {
      return function () {
        (<any>window)._cio.push([f].concat(Array.prototype.slice.call(arguments, 0)))
      }
    };

    b = ["load", "identify", "sidentify", "track", "page", "on", "off"];

    for (c = 0; c < b.length; c++) { 
      (<any>window)._cio[b[c]] = a(b[c]) 
    };

    var s = document.getElementsByTagName('script')[0];
    var t = document.createElement('script');

    t.async = true;
    t.id = 'cio-tracker';
    t.setAttribute('data-site-id', this.customerioSiteId);
    t.setAttribute('data-use-array-params', 'true');
    t.setAttribute('data-use-in-app', 'true');

    t.src = 'https://assets.customer.io/assets/track-eu.js'
    s.parentNode.insertBefore(t, s);

    this.loaded = true;
  }

  setId() {
    (<any>window)._cio.identify({
      id: this.playerService.player.uuid
    });
  }
}
