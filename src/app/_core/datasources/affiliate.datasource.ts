import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class AffiliateDataSource {

  constructor(public http: HttpClient) {
  }

  getAffiliateStrategies() {
    return this.http.get<any>(`${DomainsConfig.domain}/affiliate/get-affiliate-strategies`);
  }

  getAffiliateCampaigns() {
    return this.http.get<any>(`${DomainsConfig.domain}/affiliate/get-affiliate-campaigns`);
  }

  getAffiliateCampaignsLinks() {
    return this.http.get<any>(`${DomainsConfig.domain}/affiliate/get-affiliate-campaigns-links`);
  }

  getAffiliatePayouts(year: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate/get-affiliate-payouts`, {year});
  }

  getAffiliateStatistics(dateFrom: string, dateTo: string, sumBy: string, strategy: string, campaign: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate/get-affiliate-statistics`,
      {dateFrom, dateTo, sumBy, strategy, campaign});
  }

  addAffiliate(trafficSource: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate/add-affiliate`, {trafficSource});
  }

  createCampaign(tariffId: number, title: string, currencyCode: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate/create-campaign`, {tariffId, title, currencyCode});
  }

  createCampaignLink(campaignId: number) {
    return this.http.post<any>(`${DomainsConfig.domain}/affiliate/create-campaign-link/${campaignId}`, {});
  }

  editCampaignLink(linkId: number, title: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/affiliate/edit-campaign-link/${linkId}`, {title});
  }

}
