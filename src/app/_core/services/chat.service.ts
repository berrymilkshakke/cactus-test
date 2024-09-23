import {Injectable, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {AuthGuard} from '../guards/auth.guard';
import {first} from 'rxjs/operators';
import {PlayerChatDataSource} from '../datasources/player-chat.datasource';
import {WebSocketService} from './websocket.service';
import {EchoService} from 'ngx-laravel-echo';
import {GuestService} from './guest.service';
import {LanguagesService} from './languages.service';
import {PlayerService} from './player.service';
import {GuestChatPublicDataSource} from '../datasources/guest-chat-public.datasource';
import {ChatPublicDataSource} from '../datasources/chat-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public questions: [];
  public messages: any;

  public newMessagesCount = 0;

  @Output() public questionsReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public messagesReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public messagesUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public openChatEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public chatOpenedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public chatClosedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public newMessageEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public authenticationService: AuthenticationService,
              public authGuard: AuthGuard,
              public playerChatDataSource: PlayerChatDataSource,
              public guestChatPublicDataSource: GuestChatPublicDataSource,
              public webSocketService: WebSocketService,
              public echoService: EchoService,
              public guestService: GuestService,
              public chatPublicDataSource: ChatPublicDataSource,
              public languagesService: LanguagesService,
              public playerService: PlayerService) {

    authenticationService.authorizationEvent.subscribe(() => {
      this.getPlayerMessages();

      this.subscribeToEventNewPlayerChatMessage();
      this.subscribeToEventUserReadPlayerMessages();

      this.echoService.leave(this.guestService.guestId);
    });

    guestService.guestDataReceivedEvent.subscribe(() => {
      this.getGuestMessages();

      this.subscribeToEventNewGuestChatMessage();
      this.subscribeToEventUserReadGuestMessages();
    });

    this.guestService.guestLocaleUpdatedEvent.subscribe(() => {
      this.getQuestions();
    });

    this.playerService.playerLocaleUpdatedEvent.subscribe(() => {
      this.getQuestions();
    });

    this.chatOpenedEvent.subscribe(() => {
      if (this.newMessagesCount > 0) {
        this.updateReadStatus();
      }
    });

    webSocketService.connectedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.subscribeToEventNewPlayerChatMessage();
        this.subscribeToEventUserReadPlayerMessages();
      } else {
        if (guestService.guestId) {
          this.subscribeToEventNewGuestChatMessage();
          this.subscribeToEventUserReadGuestMessages();
        }
      }
    });

    if (this.authGuard.isAuthorized()) {
      this.getPlayerMessages();
    } else {
      if (guestService.guestId) {
        this.getGuestMessages();
      }
    }

    this.getQuestions();
  }

  subscribeToEventNewPlayerChatMessage() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'new-player-chat-message')
      .subscribe(data => {
        this.addMessageToArray(data.message);
        this.markPlayerMessagesAsRead();
        this.increaseNewMessagesCount();

        this.newMessageEvent.emit();
      });
  }

  subscribeToEventNewGuestChatMessage() {
    this.echoService.listen(this.guestService.guestId, 'new-guest-chat-message')
      .subscribe(data => {
        this.addMessageToArray(data.message);
        this.markPlayerMessagesAsRead();
        this.increaseNewMessagesCount();

        this.newMessageEvent.emit();
      });
  }

  subscribeToEventUserReadPlayerMessages() {
    this.echoService.listen(this.webSocketService.privateChannelName, 'user-read-player-messages')
      .subscribe(data => {
        this.markPlayerMessagesAsRead();
      });
  }

  subscribeToEventUserReadGuestMessages() {
    this.echoService.listen(this.guestService.guestId, 'user-read-guest-messages')
      .subscribe(data => {
        this.markPlayerMessagesAsRead();
      });
  }

  increaseNewMessagesCount() {
    this.newMessagesCount++;
  }

  addMessageToArray(message: any) {
    this.messages.push(message);
    this.messagesUpdatedEvent.emit();
  }

  markUserMessagesAsRead() {
    for (const index in this.messages) {
      if (!this.messages[index].request && !this.messages[index].read) {
        this.messages[index].read = true;
      }
    }
    this.newMessagesCount = 0;
  }

  markPlayerMessagesAsRead() {
    for (const index in this.messages) {
      if (this.messages[index].request && !this.messages[index].read) {
        this.messages[index].read = true;
      }
    }
  }

  getQuestions() {
    this.chatPublicDataSource.getQuestions()
      .pipe(first())
      .subscribe(
        data => {
          this.questions = data;
          this.questionsReceivedEvent.emit();
        });
  }

  getPlayerMessages() {
    this.playerChatDataSource.getMessages()
      .pipe(first())
      .subscribe(
        data => {
          this.messages = data;
          this.messagesReceivedEvent.emit();

          this.setNewMessagesCount(data);
        });
  }

  sendPlayerMessage(message: any) {
    this.playerChatDataSource.sendMessage(message, null)
      .pipe(first())
      .subscribe(
        data => {
          this.messagesUpdatedEvent.emit();
        });
  }

  getGuestMessages() {
    this.guestChatPublicDataSource.getMessages(this.guestService.guestId)
      .pipe(first())
      .subscribe(
        data => {
          this.messages = data;
          this.messagesReceivedEvent.emit();

          this.setNewMessagesCount(data);
        });
  }

  sendGuestMessage(message: any) {
    this.guestChatPublicDataSource.sendMessage(this.guestService.guestId, message, null)
      .pipe(first())
      .subscribe(
        data => {
          this.messagesUpdatedEvent.emit();
        });
  }

  updateReadStatus() {
    if (this.authGuard.isAuthorized()) {
      this.playerChatDataSource.setReadStatus()
        .pipe(first())
        .subscribe(
          data => {
            this.markUserMessagesAsRead();
          });
    } else {
      this.guestChatPublicDataSource.setReadStatus(this.guestService.guestId)
        .pipe(first())
        .subscribe(
          data => {
            this.markUserMessagesAsRead();
          });
    }
  }

  setNewMessagesCount(messages: any) {
    const messagesFiltered = messages.filter(function (message: any) {
      return (message.request === false) && (message.read === false);
    });

    this.newMessagesCount = messagesFiltered.length;
  }

  openChat() {
    this.openChatEvent.emit();
  }

}
