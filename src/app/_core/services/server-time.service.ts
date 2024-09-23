import {Injectable} from '@angular/core';
import {first} from 'rxjs/operators';
import {DateTimePublicDataSource} from '../datasources/date-time-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class ServerTimeService {

  public dateTime: any;

  constructor(public dateTimePublicDataSource: DateTimePublicDataSource) {
    this.getDateTime();
  }

  setInterval() {
    setInterval(() => {
      const dt = this.dateTime;
      dt.setMinutes( dt.getMinutes() + 1 );
      this.dateTime = new Date( dt );
    }, 60 * 1000);
  }

  getDateTime() {
    this.dateTimePublicDataSource.getDateTime()
      .pipe(first())
      .subscribe(
        data => {
          this.dateTime = new Date(data);
          this.setInterval();
        });
  }

}
