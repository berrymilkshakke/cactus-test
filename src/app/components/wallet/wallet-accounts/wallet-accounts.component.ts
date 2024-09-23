import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShowModalService} from '../../../modals/_services/show-modal.service';
import {PlayerDataSource} from '../../../_core/datasources/player.datasource';
import {PlayerService} from '../../../_core/services/player.service';
import {CurrenciesService} from '../../../_core/services/currencies.service';
import {first} from 'rxjs/operators';
import {PlatformDetectorService} from '../../../_core/services/platform-detector.service';


@Component({
  selector: 'app-wallet-accounts',
  templateUrl: './wallet-accounts.component.html',
  styleUrls: ['./wallet-accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WalletAccountsComponent implements OnInit {

  public accounts: any;
  public currencies: any;

  public currenciesFiltered: any;
  public currencySelectorOpened: boolean = false;

  public selectedCurrencyCode: string;

  constructor(public playerDataSource: PlayerDataSource,
              public showModalService: ShowModalService,
              public playerService: PlayerService,
              public platformDetectorService: PlatformDetectorService,
              public currenciesService: CurrenciesService) {
  }

  ngOnInit() {
    this.accounts = this.playerService.accounts;
    this.playerService.playerAccountsReceivedEvent.subscribe(() => {
      this.accounts = this.playerService.accounts;
      this.filterCurrencies();
    });

    this.currencies = this.currenciesService.currencies;
    this.currenciesService.currenciesReceivedEvent.subscribe(() => {
      this.currencies = this.currenciesService.currencies;
      this.filterCurrencies();
    });

    this.playerService.playerDefaultAccountReceivedEvent.subscribe(() => {
      this.playerService.getPlayerAccounts();
    });

    this.playerService.getPlayerAccounts();
    this.filterCurrencies();
  }

  filterCurrencies() {
    if (!this.accounts || !this.currencies) {
      return [];
    }

    const accounts = this.accounts;
    const currencies = this.currencies;

    const currenciesFiltered = [];

    let index;
    for (index in currencies) {
      const items = accounts.filter(account => account.currency_code === currencies[index].code);

      if (items.length === 0) {
        currenciesFiltered.push(currencies[index].code);
      }
    }

    this.currenciesFiltered = currenciesFiltered;
  }

  setDefaultPlayerAccount(currency: any) {
    this.playerDataSource
      .setDefaultPlayerAccount(currency)
      .pipe(first())
      .subscribe(
        (data: any) => {
          // this.getPlayerAccounts();
          this.playerService.getPlayerAccounts();
          this.playerService.getDefaultPlayerAccount();
        },
        (errors: any) => {

        });
  }

  createPlayerAccount(currency: any) {
    this.playerDataSource
      .createPlayerAccount(currency)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.playerService.getPlayerAccounts();
        },
        (errors: any) => {

        });
  }

  openSelectCurrency() {
    if (this.platformDetectorService.platform === 'desktop') {
      this.showModalService.openModalCreateAccount(this.currenciesFiltered);
    } else {
      this.currencySelectorOpened = true;
    }
  }

  selectCurrency(currencyCode: string) {
    this.selectedCurrencyCode = currencyCode;
  }

  closeSelectCurrency() {
    this.currencySelectorOpened = false;
  }
}
