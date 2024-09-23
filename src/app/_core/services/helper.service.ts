import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router: Router) {
  }

  static isGamesPageFromUrl(url: any) {
    return !!((url.indexOf('(') > -1) && (url.indexOf(')')));
  }

  getPageName() {
    return this.router.url.split('/')[1];
  }

  getPageNameFromPath(path: string) {
    return path.split('/')[1];
  }

  getUrlWithoutParameters() {

    let path = '/';
    const urlTree = this.router.parseUrl(this.router.url);

    if (!urlTree.root.children['primary']) {
      return path;
    }

    path += urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    if (path !== '/' && path.substring(path.length - 1) === '/') {
      path = path.substring(0, path.length - 1);
    }

    return path;
  }

  getUrlPathWithoutParameters(pathRequested: any) {

    let path = '/';
    const urlTree = this.router.parseUrl(pathRequested);

    if (!urlTree.root.children['primary']) {
      return path;
    }

    path += urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    return path;
  }

  isHomePage() {
    return this.getPageName() === '';
  }

  isGamePage() {
    return !!((this.router.url.indexOf('(') > -1) && (this.router.url.indexOf(')')));
  }
}
