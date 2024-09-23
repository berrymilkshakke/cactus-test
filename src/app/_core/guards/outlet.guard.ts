import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OutletGuard implements CanActivate {

  public previewsOutlet = '';

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const previewsOutlet = this.previewsOutlet;
    const nextOutlet = route.outlet;

    this.previewsOutlet = nextOutlet;

    if ((previewsOutlet === 'game')) {

      let tree;

      if (nextOutlet === 'game') {

        if (state.url.indexOf(')(') > -1) {
          const ind = state.url.indexOf(')');
          const url = state.url.substring(0, ind);

          tree = this.router.parseUrl(url);

          return tree;
        }

      } else {

        const ind = state.url.indexOf('(');

        if (ind > -1) {
          const url = state.url.substring(0, ind);

          tree = this.router.parseUrl(url);

          return tree;
        }

      }

    }

    return true;
  }
}
