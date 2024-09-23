import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Output() public routeCanNotBeActivated: EventEmitter<boolean> = new EventEmitter();

  public keyRedirectPatch = 'redirectPatch';
  public keyCurrentUser = 'currentUser';

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem(this.keyCurrentUser)) {
      return true;
    }

    // console.log('state');
    // console.log(state);

    localStorage.setItem(this.keyRedirectPatch, state.url);

    this.routeCanNotBeActivated.emit();

    return false;
  }

  isAuthorized() {
    if (localStorage.getItem(this.keyCurrentUser)) {
      return true;
    }

    return false;
  }

  getUserData() {
    const currentUser = localStorage.getItem(this.keyCurrentUser);

    if (currentUser) {
      return JSON.parse(currentUser);
    }

    return null;
  }
}
