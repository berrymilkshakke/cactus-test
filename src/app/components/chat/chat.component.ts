import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {AuthenticationService} from '../../_core/services/authentication.service';
import {LanguagesService} from '../../_core/services/languages.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ChatService} from '../../_core/services/chat.service';
import {PlayerChatDataSource} from '../../_core/datasources/player-chat.datasource';
import {GuestService} from '../../_core/services/guest.service';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {HelperService} from '../../_core/services/helper.service';
import {PerfectScrollbarComponent} from 'ngx-perfect-scrollbar';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {GuestChatPublicDataSource} from '../../_core/datasources/guest-chat-public.datasource';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {

  @ViewChild(PerfectScrollbarComponent, {static: false}) componentRef?: PerfectScrollbarComponent;

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  public showQuestions: boolean = false;

  public questions: any = [];
  public messages: any = [];

  public showChat: boolean = false;
  public fileToUpload: File = null;

  constructor(public authGuard: AuthGuard,
              public formBuilder: FormBuilder,
              public authenticationService: AuthenticationService,
              public languagesService: LanguagesService,
              public chatService: ChatService,
              public playerChatDataSource: PlayerChatDataSource,
              public guestChatPublicDataSource: GuestChatPublicDataSource,
              public guestService: GuestService,
              public platformDetectorService: PlatformDetectorService,
              public helperService: HelperService,
              public translateService: TranslateService,
              public notifierService: NotifierService) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      message: ['', Validators.compose(
        [Validators.required, Validators.minLength(1), Validators.maxLength(1024)]
      )]
    });

    this.questions = this.chatService.questions;
    this.chatService.questionsReceivedEvent.subscribe(() => {
      this.questions = this.chatService.questions;
    });

    this.messages = this.chatService.messages;
    this.checkCountMessages(this.messages);
    this.chatService.messagesReceivedEvent.subscribe(() => {
      this.messages = this.chatService.messages;
      this.checkCountMessages(this.messages);
      this.scrollChatToBottom();
    });

    this.chatService.messagesUpdatedEvent.subscribe(() => {
      this.hideQuestions();
      this.scrollChatToBottom();
    });

    this.chatService.openChatEvent.subscribe(() => {
      this.openChat();
    });

    this.chatService.newMessageEvent.subscribe(() => {
      if (!this.showChat) {
        this.translateService.get('notifications.new_message').subscribe((text: string) => {
          this.notifierService.notify('success', text);
        });
      }
    });

    this.scrollChatToBottom();
  }

  scrollChatToBottom() {
    const componentRef = this.componentRef;

    setTimeout(function () {
      if (!componentRef) {
        return;
      }
      componentRef.directiveRef.scrollToBottom();
    }, 200);
  }

  checkCountMessages(messages: any) {
    if (messages && (messages.length === 0)) {
      this.showQuestions = true;
    }
  }

  toggleQuestions() {
    this.showQuestions = !this.showQuestions;

    if (!this.showQuestions) {
      this.scrollChatToBottom();
    }
  }

  hideQuestions() {
    this.showQuestions = false;
    // this.scrollChatToBottom();
  }

  sendGuestMessage(questionId: any) {
    this.guestChatPublicDataSource
      .sendMessage(this.guestService.guestId, this.f.message.value, questionId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.formGroup.reset();
          this.f['message'].setErrors(null);

          this.chatService.addMessageToArray(data);
          this.hideQuestions();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

  sendPlayerMessage(questionId: any) {
    this.playerChatDataSource
      .sendMessage(this.f.message.value, questionId)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.errors = '';

          this.formGroup.reset();
          this.f['message'].setErrors(null);

          this.chatService.addMessageToArray(data);
          this.hideQuestions();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    if (this.authGuard.isAuthorized()) {
      this.sendPlayerMessage(null);
    } else {
      this.sendGuestMessage(null);
    }
  }

  uploadDocument() {
    this.loading = true;
    this.playerChatDataSource.uploadDocument(
      this.fileToUpload
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;

          this.translateService.get('documents.document_uploaded').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

          this.chatService.addMessageToArray(data);
          this.hideQuestions();
        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

  sendQuestion(questionId: any, text: string) {

    this.f['message'].setValue(text);

    if (this.authGuard.isAuthorized()) {
      this.sendPlayerMessage(questionId);
    } else {
      this.sendGuestMessage(questionId);
    }
  }

  handleKeyDown(event: any) {
    if ((event.metaKey && event.key === 'Enter') || (event.ctrlKey && event.key === 'Enter')) {
      this.onSubmit();
    }
  }

  openChat() {
    this.showChat = true;
    this.scrollChatToBottom();
    this.chatService.chatOpenedEvent.emit();
  }

  closeChat() {
    this.showChat = false;
    this.chatService.chatClosedEvent.emit();
  }

  getPlatform() {
    return this.platformDetectorService.platform;
  }

  isGamePage() {
    return this.helperService.isGamePage();
  }

  getNewMessagesCount() {
    return this.chatService.newMessagesCount;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadDocument();
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }
}
