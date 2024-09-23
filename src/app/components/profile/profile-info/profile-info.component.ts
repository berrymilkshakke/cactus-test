import {Component, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileInfoComponent {

  public chowNoDepositConditions: boolean = false;

  constructor() {
    this.chowNoDepositConditions = DomainsConfig.chowNoDepositConditions;
  }
}
