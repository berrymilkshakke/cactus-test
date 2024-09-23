import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LanguagesService} from '../../../_core/services/languages.service';
import {GuestService} from '../../../_core/services/guest.service';
import {PlayerService} from '../../../_core/services/player.service';
import {ComponentsPublicDataSource} from '../../../_core/datasources/components-public.datasource';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-faq-deposit',
  templateUrl: './faq-deposit.component.html',
  styleUrls: ['./faq-deposit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqDepositComponent implements OnInit {

  public faq: any;

  public componentName: string = 'faq-deposit';

  constructor(public languagesService: LanguagesService,
              public guestService: GuestService,
              public playerService: PlayerService,
              public componentsPublicDataSource: ComponentsPublicDataSource) {
  }

  ngOnInit() {
    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getComponentPublic(this.componentName);
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getComponentPublic(this.componentName);
    });

    this.getComponentPublic(this.componentName);
  }

  getComponentPublic(componentName: string) {
    this.componentsPublicDataSource.getComponentJson(componentName)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.faq = data;
        });
  }
}
