import {Component, ViewEncapsulation} from '@angular/core';
import {LanguagesService} from '../../_core/services/languages.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {ChatService} from '../../_core/services/chat.service';


@Component({
  selector: 'app-main-menu-mobile',
  templateUrl: './main-menu-mobile.component.html',
  styleUrls: ['./main-menu-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuMobileComponent {

  constructor(public languagesService: LanguagesService,
              public authGuard: AuthGuard,
              public chatService: ChatService) { }

  openChat() {
    this.chatService.openChat();
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }
}
