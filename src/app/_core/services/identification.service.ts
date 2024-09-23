import {Injectable} from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';
import {Helper} from '../classes/helper';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  public identifierName = 'identifier';
  public expirationTime = 36500;

  public fingerprint: string;
  public identifier: string;

  constructor(public cookieService: CookieService) {

    this.setFingerprint();
    this.getIdentifier();
  }

  getRandomString() {
    return Helper.getRandomString(32);
  }

  setFingerprint() {
    const that = this;
    const options = {};
    Fingerprint2.get(options, function (components) {

      const values = components.map(function (component) {
        return component.value;
      });

      const murmur = Fingerprint2.x64hash128(values.join(''), 31);

      that.fingerprint = murmur;
    });
  }

  getIdentifier() {
    let identifier = this.identifier;
    const isIdentifierSet = !!this.identifier;
    const idInCookieExists = this.cookieService.check(this.identifierName);
    const idInStorageExists = localStorage.getItem(this.identifierName) !== null;

    if (isIdentifierSet && (!idInCookieExists || !idInStorageExists)) {
      this.cookieService.set(this.identifierName, identifier, this.expirationTime, '/', '', false, 'Lax');
      localStorage.setItem(this.identifierName, identifier);
      return identifier;

    } else if (!isIdentifierSet && !idInCookieExists && !idInStorageExists) {
      identifier = this.getRandomString();
      this.cookieService.set(this.identifierName, identifier, this.expirationTime, '/', '', false, 'Lax');
      localStorage.setItem(this.identifierName, identifier);
      this.identifier = identifier;
      return identifier;

    } else if (!isIdentifierSet && !idInCookieExists && idInStorageExists) {
      identifier = localStorage.getItem(this.identifierName);
      this.cookieService.set(this.identifierName, identifier, this.expirationTime, '/', '', false, 'Lax');
      this.identifier = identifier;
      return identifier;

    } else if (!isIdentifierSet && idInCookieExists && !idInStorageExists) {
      identifier = this.cookieService.get(this.identifierName);
      localStorage.setItem(this.identifierName, identifier);
      this.identifier = identifier;
      return identifier;
    } else if (!isIdentifierSet) {
      identifier = this.cookieService.get(this.identifierName);
      this.identifier = identifier;
      return identifier;
    }

    return identifier;
  }

}
