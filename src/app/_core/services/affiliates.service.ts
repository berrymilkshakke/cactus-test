import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {AffiliateDataSource} from '../datasources/affiliate.datasource';


@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  public affiliateStrategies: [];
  public affiliateCampaigns: [];

  @Output() public affiliateStrategiesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public affiliateCampaignsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public affiliateTariffOptionsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public affiliateCampaignsUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public affiliateDataSource: AffiliateDataSource) {

    this.getAffiliateStrategies();
    this.getAffiliateCampaigns();
  }

  getAffiliateStrategies() {
    this.affiliateDataSource.getAffiliateStrategies()
      .pipe(first())
      .subscribe(
        data => {
          this.affiliateStrategies = data;
          this.affiliateStrategiesReceivedEvent.emit();
        });
  }

  getAffiliateCampaigns() {
    this.affiliateDataSource.getAffiliateCampaigns()
      .pipe(first())
      .subscribe(
        data => {
          this.affiliateCampaigns = data;
          this.affiliateCampaignsReceivedEvent.emit();
        });
  }

}

