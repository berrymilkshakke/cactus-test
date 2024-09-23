import {Component, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-policies-aml',
  templateUrl: './policies-aml.component.html',
  styleUrls: ['./policies-aml.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PoliciesAmlComponent {

  public componentName: string;

  constructor() {

    this.componentName = DomainsConfig.policiesAmlComponentName;
  }
}
