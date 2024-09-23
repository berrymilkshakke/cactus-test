import {Component, ViewEncapsulation} from '@angular/core';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {ChatService} from '../../_core/services/chat.service';


@Component({
  selector: 'app-main-menu-desktop',
  templateUrl: './main-menu-desktop.component.html',
  styleUrls: ['./main-menu-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuDesktopComponent {

  constructor(public authGuard: AuthGuard,
              public chatService: ChatService) { }

  openChat() {
    this.chatService.openChat();
  }
}
