import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PlayerService} from '../services/player.service';


@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {

  @Output() public emailNotConfirmedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public router: Router,
              public playerService: PlayerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const player = this.playerService.player;

    if (player && !player.email_confirmed) {
      this.emailNotConfirmedEvent.emit();
    }

    return true;
  }

}
