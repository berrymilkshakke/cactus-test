import {Injectable} from '@angular/core';
import {first} from 'rxjs/operators';
import {PhoneCodesPublicDataSource} from '../datasources/phone-codes-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class PhoneCodesService {

  public phoneCodes: {};

  constructor(public phoneCodesPublicDataSource: PhoneCodesPublicDataSource) {

    this.getCodes();
  }

  getCodes() {
    this.phoneCodesPublicDataSource.getCodes()
      .pipe(first())
      .subscribe(data => {
        this.phoneCodes = data;

      });
  }

  getCodeById(id: number) {

    if (!this.phoneCodes) {
      return null;
    }

    const phoneCodes = this.phoneCodes;

    let index;
    for (index in phoneCodes) {
      if (id === phoneCodes[index].id) {
        return phoneCodes[index];
      }
    }

    return null;
  }
}
