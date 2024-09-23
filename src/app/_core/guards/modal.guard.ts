import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { ShowModalService } from '../../modals/_services/show-modal.service';


@Injectable({
  providedIn: 'root'
})
export class ModalGuard implements CanActivate {

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public showModalService: ShowModalService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const tree: UrlTree = this.router.parseUrl(state.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;

    if (s[0] && s[1] && (s[0].path == 'modal')) {

      this.showModalService.openModalContent(s[1].path);

      return false;
    }

    return true;
  }
}
