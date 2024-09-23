import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  public isEnabled: boolean = false;

  constructor() {}

  getState() {
    return this.isEnabled;
  }

  show() {
    return this.isEnabled = true;
  }

  hide() {
    return this.isEnabled = false;
  }
}
