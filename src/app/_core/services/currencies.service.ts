import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {CurrenciesPublicDataSource} from '../datasources/currencies-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  public currencies: [];

  @Output() public currenciesReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public currenciesPublicDataSource: CurrenciesPublicDataSource) {

    this.getCurrencies();
  }

  getCurrencies() {
    this.currenciesPublicDataSource.getCurrencies()
      .pipe(first())
      .subscribe(
        data => {
          this.currencies = data;
          this.currenciesReceivedEvent.emit();
        });
  }

}
