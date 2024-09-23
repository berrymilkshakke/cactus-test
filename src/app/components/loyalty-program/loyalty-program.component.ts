import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LanguagesService} from '../../_core/services/languages.service';
import {GuestService} from '../../_core/services/guest.service';
import {PlayerService} from '../../_core/services/player.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {ContentService} from '../../_core/services/content.service';


@Component({
  selector: 'app-loyalty-program',
  templateUrl: './loyalty-program.component.html',
  styleUrls: ['./loyalty-program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoyaltyProgramComponent implements OnInit {

  public componentName: string = 'levels';
  public levels: any;

  public currentLevel: any;
  public nextLevel: any;

  constructor(public languagesService: LanguagesService,
              public guestService: GuestService,
              public playerService: PlayerService,
              public authGuard: AuthGuard,
              public contentService: ContentService) {
  }

  ngOnInit() {

    this.contentService.componentUpdatedEvent.subscribe((componentName: string) => {
      if (componentName === this.componentName) {
        this.levels = this.contentService.getContentJson(this.componentName);
        this.setCurrentLevel();
        this.setNextLevel();
      }
    });

    this.levels = this.contentService.getContentJson(this.componentName);

    this.playerService.playerPointsAccountReceivedEvent.subscribe(() => {
      this.setCurrentLevel();
      this.setNextLevel();
    });

    this.playerService.playerGroupsReceivedEvent.subscribe(() => {
      this.setCurrentLevel();
      this.setNextLevel();
    });

    this.setCurrentLevel();
    this.setNextLevel();
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  getCurrentLevelName() {
    return this.playerService.getCurrentGroupName();
  }

  setCurrentLevel() {

    if (!this.levels || !this.playerService.getCurrentGroupName()) {
      return;
    }

    this.currentLevel = this.levels.find(item => item.name === this.playerService.getCurrentGroupName());

    if (this.currentLevel) {
      this.currentLevel.pointsToNextLevel = this.playerService.getPointsToNextLevel();
      this.currentLevel.currentGroupProgress = this.playerService.getCurrentGroupProgress();
    }
  }

  setNextLevel() {

    if (!this.levels || !this.playerService.getCurrentGroupName()) {
      return;
    }

    const levels = this.levels;

    let currentLevelIndex;
    for (const index in levels) {
      if (levels[index].name === this.currentLevel.name) {
        currentLevelIndex = Number(index);
        break;
      }
    }

    if ((currentLevelIndex !== undefined) && (currentLevelIndex < (levels.length - 1))) {
      this.nextLevel = levels[currentLevelIndex + 1];
    }
  }
}
