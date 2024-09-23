import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(public title: Title,
              public meta: Meta,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public translateService: TranslateService) {
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setDescription(desc: string) {
    this.meta.updateTag({name: 'description', content: desc});
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({name: 'og:url', content: url});
  }

  updateMetaInfo(content: string, author: string, category: string) {
    this.meta.updateTag({name: 'description', content: content});
    this.meta.updateTag({name: 'author', content: author});
    this.meta.updateTag({name: 'keywords', content: category});
  }

  updateTitle(title?: string) {
    if (!title) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) {
              route = route.firstChild;
            }
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)
        ).subscribe((event) => {

        const keyBaseTitle = 'project.title';
        const keyTitle = 'titles' + '.' + event['name'];
        this.translateService.get([keyBaseTitle, keyTitle]).subscribe((res: string) => {

          if (res[keyTitle] === keyTitle) {
            this.setTitle(res[keyBaseTitle]);
          } else {
            this.setTitle(res[keyBaseTitle] + ' - ' + res[keyTitle]);
          }
        });

        const keyBaseDescription = 'project.description';
        const keyDescription = 'descriptions' + '.' + event['name'];
        this.translateService.get([keyBaseDescription, keyDescription]).subscribe((res: string) => {

          if (res[keyDescription] === keyDescription) {
            this.setDescription(res[keyBaseDescription]);
          } else {
            this.setDescription(res[keyBaseDescription] + ' - ' + res[keyDescription]);
          }
        });

      });
    } else {
      this.setTitle(title); //  + ' | Site name'
    }
  }

}
