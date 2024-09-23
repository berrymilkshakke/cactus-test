import {Injectable} from '@angular/core';
import {first} from 'rxjs/operators';
import {CountriesPublicDataSource} from '../datasources/countries-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public countries: {};

  constructor(public countriesPublicDataSource: CountriesPublicDataSource) {

    this.getCountries();
  }

  getCountries() {
    this.countriesPublicDataSource.getCountries()
      .pipe(first())
      .subscribe(
        data => {
          this.countries = data;
        });
  }

  getCountryByCode(code: string) {
    const countries = this.countries;

    let index;
    for (index in countries) {
      if (code === countries[index].code) {
        return countries[index];
      }
    }

    return null;
  }
}
