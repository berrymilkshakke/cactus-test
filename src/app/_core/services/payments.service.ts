import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {AuthGuard} from '../guards/auth.guard';
import {PlayerService} from './player.service';
import {PaymentMethodsDataSource} from '../datasources/payment-methods.datasource';
import {WebSocketService} from './websocket.service';
import {TranslateService} from '@ngx-translate/core';
import {EchoService} from 'ngx-laravel-echo';
import {PaymentMethodsPublicDataSource} from '../datasources/payment-methods-public.datasource';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public depositMethods: any;
  public withdrawalMethods: any;

  public cdnServer: any;

  @Output() public paymentDepositMethodsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public paymentWithdrawalMethodsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public paymentMethodsDataSource: PaymentMethodsDataSource,
              public authenticationService: AuthenticationService,
              public paymentMethodsPublicDataSource: PaymentMethodsPublicDataSource,
              public authGuard: AuthGuard,
              public playerService: PlayerService,
              public webSocketService: WebSocketService,
              public translateService: TranslateService,
              public echoService: EchoService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getDepositMethods();
      this.getWithdrawalMethods();
    });

    playerService.playerGroupsChangedEvent.subscribe(() => {
      this.getDepositMethods();
      this.getWithdrawalMethods();
    });

    playerService.depositCompletedEvent.subscribe(() => {
      this.getDepositMethods();
    });

    authenticationService.logoutEvent.subscribe(() => {
      this.getDepositMethodsPublic();
      this.getWithdrawalMethodsPublic();
    });

    webSocketService.connectedEvent.subscribe(() => {
      this.subscribeToEventPaymentMethodsUpdated();
    });

    if (authGuard.isAuthorized()) {
      this.getDepositMethods();
      this.getWithdrawalMethods();
    } else {
      this.getDepositMethodsPublic();
      this.getWithdrawalMethodsPublic();
    }

    this.cdnServer = DomainsConfig.cdnServer;
  }

  subscribeToEventPaymentMethodsUpdated() {
    this.echoService.listen(this.webSocketService.publicChannelName, 'payment-methods-updated')
      .subscribe(data => {
        if (this.authGuard.isAuthorized()) {
          this.getDepositMethods();
          this.getWithdrawalMethods();
        } else {
          this.getDepositMethodsPublic();
          this.getWithdrawalMethodsPublic();
        }
      });
  }

  getDepositMethods() {
    this.paymentMethodsDataSource.getDepositMethods()
      .pipe(first())
      .subscribe(
        data => {
          this.depositMethods = data;
          this.paymentDepositMethodsReceivedEvent.emit();
        });
  }

  getDepositMethodsPublic() {
    this.paymentMethodsPublicDataSource.getDepositMethods()
      .pipe(first())
      .subscribe(
        data => {
          this.depositMethods = data;
          this.paymentDepositMethodsReceivedEvent.emit();
        });
  }

  getWithdrawalMethods() {
    this.paymentMethodsDataSource.getWithdrawalMethods()
      .pipe(first())
      .subscribe(
        data => {
          this.withdrawalMethods = data;
          this.paymentWithdrawalMethodsReceivedEvent.emit();
        });
  }

  getWithdrawalMethodsPublic() {
    this.paymentMethodsPublicDataSource.getWithdrawalMethods()
      .pipe(first())
      .subscribe(
        data => {
          this.withdrawalMethods = data;
          this.paymentWithdrawalMethodsReceivedEvent.emit();
        });
  }

  getImagePatch(image: string) {
    return `${this.cdnServer}/payments/${image}`;
  }

  getAccountPlaceholder(paymentMethod: any) {
    if (!paymentMethod) {
      return '';
    }

    let placeholder = '';
    placeholder += this.translateService.instant(`placeholders.${paymentMethod.payment_service_name}`);
    if (paymentMethod.field_example) {
      placeholder += ' ';
      placeholder += this.translateService.instant('placeholders.in_format');
      placeholder += ` ${paymentMethod.field_example}`;
    }

    return placeholder;
  }

}
