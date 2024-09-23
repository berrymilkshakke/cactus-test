import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {ComponentsPublicDataSource} from '../datasources/components-public.datasource';
import {ComponentsDataSource} from '../datasources/components.datasource';
import {AuthGuard} from '../guards/auth.guard';
import {GuestService} from './guest.service';
import {PlayerService} from './player.service';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public components = {};
  public componentsJson = {};

  @Output() public componentUpdatedEvent: EventEmitter<string> = new EventEmitter();

  constructor(public authGuard: AuthGuard,
              public guestService: GuestService,
              public playerService: PlayerService,
              public componentsDataSource: ComponentsDataSource,
              public componentsPublicDataSource: ComponentsPublicDataSource) {

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.updateAllContent();
      this.updateAllContentJson();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.updateAllContent();
      this.updateAllContentJson();
    });
  }

  getComponent(componentName: string) {
    this.componentsDataSource.getComponent(componentName)
      .pipe(first())
      .subscribe(
        data => {
          this.components[componentName] = data;
          this.componentUpdatedEvent.emit(componentName);
        });
  }

  getComponentPublic(componentName: string) {
    this.componentsPublicDataSource.getComponent(componentName)
      .pipe(first())
      .subscribe(
        data => {
          this.components[componentName] = data;
          this.componentUpdatedEvent.emit(componentName);
        });
  }

  getComponentJson(componentName: string) {
    this.componentsDataSource.getComponentJson(componentName)
      .pipe(first())
      .subscribe(
        data => {
          this.componentsJson[componentName] = data;
          this.componentUpdatedEvent.emit(componentName);
        });
  }

  getComponentJsonPublic(componentName: string) {
    this.componentsPublicDataSource.getComponentJson(componentName)
      .pipe(first())
      .subscribe(
        data => {
          this.componentsJson[componentName] = data;
          this.componentUpdatedEvent.emit(componentName);
        });
  }

  updateContent(componentName: string) {
    if (this.authGuard.isAuthorized()) {
      this.getComponent(componentName);
    } else {
      this.getComponentPublic(componentName);
    }
  }

  updateContentJson(componentName: string) {
    if (this.authGuard.isAuthorized()) {
      this.getComponentJson(componentName);
    } else {
      this.getComponentJsonPublic(componentName);
    }
  }

  updateAllContent() {
    for (const componentName in this.components) {
      this.updateContent(componentName);
    }
  }

  updateAllContentJson() {
    for (const componentName in this.componentsJson) {
      this.updateContentJson(componentName);
    }
  }

  getContent(componentName: string) {
    if (componentName in this.components) {
      return this.components[componentName];
    } else {
      this.updateContent(componentName);

      return null;
    }
  }

  getContentJson(componentName: string) {
    if (componentName in this.componentsJson) {
      return this.componentsJson[componentName];
    } else {
      this.updateContentJson(componentName);

      return null;
    }
  }
}
