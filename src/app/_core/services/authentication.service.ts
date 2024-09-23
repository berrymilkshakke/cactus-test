import {EventEmitter, Injectable, Output} from '@angular/core';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IdentificationService} from './identification.service';
import {AuthPublicDataSource} from '../datasources/auth-public.datasource';
import {AuthDataSource} from '../datasources/auth.datasource';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public tokenName = 'currentUser';

  @Output() public registrationEvent: EventEmitter<string> = new EventEmitter();
  @Output() public registrationAndAuthorizationEvent: EventEmitter<string> = new EventEmitter();
  @Output() public confirmationEvent: EventEmitter<string> = new EventEmitter();
  @Output() public authorizationEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public logoutEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public identificationService: IdentificationService,
              public authDataSource: AuthDataSource,
              public authPublicDataSource: AuthPublicDataSource,
              public router: Router) {
  }

  isTokenExist() {
    if (localStorage.getItem(this.tokenName)) {
      return true;
    }

    return false;
  }

  saveToken(user: any) {
    if (user && user.token) {
      localStorage.setItem(this.tokenName, JSON.stringify(user));
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenName);
    this.logoutEvent.emit();
  }

  register(
    email: string,
    password: string,
    currency: string,
    subscription: boolean,
    language: string,
    linkCode: string,
    clickId: string
  ) {
    return this.authPublicDataSource.register(
      email,
      password,
      currency,
      subscription,
      language,
      linkCode,
      clickId,
      this.identificationService.fingerprint,
      this.identificationService.getIdentifier()
    )
      .pipe(map(data => {

        if (data && data.token) {
          this.saveToken(data);
          this.registrationAndAuthorizationEvent.emit();
          this.authorizationEvent.emit();

          return;
        }

        this.registrationEvent.emit(email);
      }));
  }

  confirmation(token: string) {
    return this.authPublicDataSource.confirm(token)
      .pipe(map(data => {
        this.saveToken(data);
        this.confirmationEvent.emit();
        this.authorizationEvent.emit();
      }));
  }

  login(email: string, password: string) {
    return this.authPublicDataSource.login(
      email,
      password,
      this.identificationService.fingerprint,
      this.identificationService.getIdentifier()
    )
      .pipe(map(data => {

        this.saveToken(data);
        this.authorizationEvent.emit();
      }));
  }

  logout() {
    this.authDataSource.logout(
      this.identificationService.fingerprint,
      this.identificationService.getIdentifier()
    )
      .subscribe((data) => {
        //
      }, errors => {
        //
      }, () => {
        this.removeToken();
      });
  }

}
