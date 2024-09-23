import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {NotifierService} from 'angular-notifier';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService,
              public notifierService: NotifierService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(data => {

      const errors = data.error.errors || data.statusText;

      if (data.status === 400) {
        if (errors.message) {
          this.notifierService.notify('error', errors.message);
        }
      }

      if (data.status === 401) {
        if (this.authenticationService.isTokenExist()) {
          this.authenticationService.removeToken();
          if (errors.message) {
            this.notifierService.notify('error', errors.message);
          }
        }
      }

      return throwError(errors);
    }));
  }
}
