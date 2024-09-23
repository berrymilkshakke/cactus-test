import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ContentService} from '../../_core/services/content.service';
import {GuestService} from '../../_core/services/guest.service';
import {PlayerService} from '../../_core/services/player.service';
import {AuthGuard} from '../../_core/guards/auth.guard';


@Component({
  selector: 'app-loyalty-item',
  templateUrl: './loyalty-item.component.html',
  styleUrls: ['./loyalty-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoyaltyItemComponent implements OnInit {

  @Input() level: any;
  @Input() nextLevel: any;
  @Input() isCurrentLevel: boolean = false;
  @Input() showNextLevelBenefits: boolean = false;

  constructor(public authGuard: AuthGuard,
              public guestService: GuestService,
              public playerService: PlayerService) {
  }

  ngOnInit() {
  }

  getCurrencyCode() {
    if (this.authGuard.isAuthorized()) {
      return this.playerService.currencyCode;
    } else {
      return this.guestService.currencyCode;
    }
  }
}
