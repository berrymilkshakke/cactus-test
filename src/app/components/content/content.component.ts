import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {ComponentsDataSource} from '../../_core/datasources/components.datasource';
import {ComponentsPublicDataSource} from '../../_core/datasources/components-public.datasource';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {PlayerService} from '../../_core/services/player.service';
import {GuestService} from '../../_core/services/guest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  @Input() componentName: string;

  public component: any;

  constructor(public authGuard: AuthGuard,
              public componentsDataSource: ComponentsDataSource,
              public componentsPublicDataSource: ComponentsPublicDataSource,
              public authenticationService: AuthenticationService,
              public guestService: GuestService,
              public router: Router,
              public playerService: PlayerService) {
  }

  ngOnInit() {
    this.authenticationService.authorizationEvent.subscribe(() => {
      this.getComponent(this.componentName);
    });

    this.authenticationService.logoutEvent.subscribe(() => {
      this.getComponentPublic(this.componentName);
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getComponentPublic(this.componentName);
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getComponent(this.componentName);
    });

    if (this.authGuard.isAuthorized()) {
      this.getComponent(this.componentName);
    } else {
      this.getComponentPublic(this.componentName);
    }
  }

  getComponent(componentName: string) {
    this.componentsDataSource.getComponent(componentName)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.component = data;
        });
  }

  getComponentPublic(componentName: string) {
    this.componentsPublicDataSource.getComponent(componentName)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.component = data;
        });
  }

  public onClick(event: Event): void {
    event.preventDefault();

    const target: HTMLElement = event.target as HTMLElement;
    const attributes: NamedNodeMap = target.attributes;
    const redirectUrl: string = attributes && attributes['href'] ? attributes['href'].value : '';

    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
    }
  }
}
