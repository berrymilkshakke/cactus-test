import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacyPolicyComponent {

  public componentName: string = 'privacy-policy';
}
