import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PlayerService} from '../services/player.service';


@Injectable({
  providedIn: 'root'
})
export class AffiliateGuard implements CanActivate {

  @Output() public routeCanNotBeActivated: EventEmitter<boolean> = new EventEmitter();

  constructor(public router: Router,
              public playerService: PlayerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const player = this.playerService.player;

    if (!player) {
      this.routeCanNotBeActivated.emit();
      return false;
    }

    if (!player.affiliated) {
      return false;
    }

    return true;
  }

}
