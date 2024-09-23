import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GuestService} from '../../_core/services/guest.service';
import {PlayerService} from '../../_core/services/player.service';


@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForbiddenComponent implements OnInit {

  constructor(public guestService: GuestService,
              public playerService: PlayerService) {
    //
  }

  ngOnInit() {
  }

  getPlayer() {
    return this.playerService.player;
  }

  isPlayerCountryAllowed() {
    return this.playerService.player.country_allowed;
  }

  getGuest() {
    return this.guestService.guest;
  }

  isGuestCountryAllowed() {
    return this.guestService.guest.country_allowed;
  }
}
