import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';
import {PlayerService} from '../../_core/services/player.service';
import {DeviceDetectorService} from 'ngx-device-detector';


@Component({
  selector: 'app-modal-create-account',
  templateUrl: './modal-create-account.component.html',
  styleUrls: ['./modal-create-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalCreateAccountComponent {

  @Input() currenciesFiltered: any;

  public selectedCurrencyCode: any;

  constructor(public activeModal: NgbActiveModal,
              public playerDataSource: PlayerDataSource,
              public deviceDetectorService: DeviceDetectorService,
              public playerService: PlayerService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  selectCurrency(currencyCode: any) {
    this.selectedCurrencyCode = currencyCode;
  }

  createPlayerAccount(selectedCurrencyCode: any) {
    this.playerDataSource
      .createPlayerAccount(selectedCurrencyCode)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.activeModal.close();
          this.playerService.getPlayerAccounts();
        },
        (errors: any) => {

        });
  }

  isDesktop() {
    return this.deviceDetectorService.isDesktop();
  }
}
