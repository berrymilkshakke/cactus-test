import {Component, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-policies-terms',
  templateUrl: './policies-terms.component.html',
  styleUrls: ['./policies-terms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PoliciesTermsComponent {

  public componentName: string;

  constructor() {

    this.componentName = DomainsConfig.termsComponentName;
  }
}
