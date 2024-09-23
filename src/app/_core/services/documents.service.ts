import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {DocumentsDataSource} from '../datasources/documents.datasource';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  public categories: [];

  @Output() public documentCategoriesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public documentsUpdatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public documentUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public documentsDataSource: DocumentsDataSource,
              public webSocketService: WebSocketService,
              public authGuard: AuthGuard,
              public echoService: EchoService,
              public authenticationService: AuthenticationService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.subscribeToEventPlayerDocumentStatusChanged();
    });

    webSocketService.connectedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.subscribeToEventPlayerDocumentStatusChanged();
      }
    });

    this.getCategories();
  }

  subscribeToEventPlayerDocumentStatusChanged() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'document-status-changed')
      .subscribe(data => {
        this.documentUpdatedEvent.emit(data.documentId);
      });
  }

  getCategories() {
    this.documentsDataSource.getCategories()
      .pipe(first())
      .subscribe(data => {
        this.categories = data;
        this.documentCategoriesReceivedEvent.emit();
      });
  }
}
