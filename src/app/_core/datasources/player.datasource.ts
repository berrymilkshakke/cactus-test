import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../models/player';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class PlayerDataSource {

  constructor(public http: HttpClient) {
  }

  getPlayerDetails() {
    return this.http.get<Player>(`${DomainsConfig.domain}/player/get-player-details`);
  }

  getPlayerInfo() {
    return this.http.get<Player>(`${DomainsConfig.domain}/player/get-player-info`);
  }

  getPlayerAccounts() {
    return this.http.get<any>(`${DomainsConfig.domain}/player/get-player-accounts`);
  }

  getDefaultPlayerAccount() {
    return this.http.get<any>(`${DomainsConfig.domain}/player/get-default-player-account`);
  }

  getPointsAccount(fingerprint: string, identifier: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/player/get-points-account`, {fingerprint, identifier});
  }

  getPlayerGroups() {
    return this.http.get<any>(`${DomainsConfig.domain}/player/get-player-groups`);
  }

  getPlayerPhone() {
    return this.http.get<any>(`${DomainsConfig.domain}/player/get-player-phone`);
  }

  editPlayerInfo(
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    phoneCodeId: number,
    phoneNumber: string,
    countryCode: string,
    region: string,
    city: string,
    address: string,
    postalCode: string,
    timeZoneId: any,
    refuseBonuses: boolean,
    newsletter: boolean
  ) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/edit-player-info`,
      {
        email,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        phoneCodeId,
        phoneNumber,
        countryCode,
        region,
        city,
        address,
        postalCode,
        timeZoneId,
        refuseBonuses,
        newsletter
      }
    );
  }

  changeCurrentPassword(currentPassword: string, newPassword: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/change-password`,
      {currentPassword, newPassword});
  }

  setDefaultPlayerAccount(currency: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/set-default-player-account`,
      {currency});
  }

  createPlayerAccount(currency: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/player/create-player-account`,
      {currency});
  }

  setPlayerLocale(localeCode: string) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/set-player-locale`, {localeCode});
  }

  postPlayerPhone(phoneCodeId: number, phoneNumber: string) {
    return this.http.post<any>(`${DomainsConfig.domain}/player/post-player-phone`, {phoneCodeId, phoneNumber});
  }

  initConfirmationPlayerPhone(phoneCodeId: number, phoneNumber: string, code: any) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/init-confirmation-player-phone`, {phoneCodeId, phoneNumber, code});
  }

  confirmPlayerPhone(phoneCodeId: number, phoneNumber: string, code: any) {
    return this.http.put<any>(`${DomainsConfig.domain}/player/confirm-player-phone`, {phoneCodeId, phoneNumber, code});
  }

}
