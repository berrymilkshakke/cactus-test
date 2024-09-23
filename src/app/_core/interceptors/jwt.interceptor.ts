import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public translateService: TranslateService) {
  }

  public keyCurrentUser = 'currentUser';
  public keyDefaultLanguage = 'defaultLanguage';
  // public cookieName = 'guestId';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem(this.keyCurrentUser));
    // const guestId = localStorage.getItem(this.cookieName);

    if (!request.withCredentials) {

      if (currentUser && currentUser.token) {

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });

      } else {
          /*
          if (guestId) {
            request = request.clone({
              setHeaders: {
                'Guest-Id': guestId
              }
            });
          }
          */
      }
    }

    const cookieLanguage = localStorage.getItem(this.keyDefaultLanguage);

    request = request.clone({
      setHeaders: {
        'Content-Language': `${cookieLanguage || 'en'}`
      },
      // withCredentials: true
    });

    return next.handle(request);
  }
}
