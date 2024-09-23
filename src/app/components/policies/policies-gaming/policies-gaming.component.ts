import {Component, ViewEncapsulation} from '@angular/core';
import {DomainsConfig} from '../../../_configs/domains.conf';


@Component({
  selector: 'app-policies-terms',
  templateUrl: './policies-gaming.component.html',
  styleUrls: ['./policies-gaming.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PoliciesGamingComponent {

  public componentName: string;

  constructor() {

    this.componentName = DomainsConfig.policiesGamingComponentName;
  }
}
