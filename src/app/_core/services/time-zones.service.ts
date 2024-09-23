import {Injectable} from '@angular/core';
import {first} from 'rxjs/operators';
import {TimeZonesPublicDataSource} from '../datasources/time-zones-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class TimeZonesService {

  public timeZones: {};

  constructor(private timeZonesPublicDataSource: TimeZonesPublicDataSource) {

    timeZonesPublicDataSource.getTimeZones()
      .pipe(first())
      .subscribe(
        data => {
          this.timeZones = data;
        });

  }

  getTimeZones() {
    return this.timeZones;
  }

  getTimeZoneById(id: number) {
    const timeZones = this.timeZones;

    let index;
    for (index in timeZones) {
      if (id === timeZones[index].id) {
        return timeZones[index];
      }
    }

    return null;
  }

}
