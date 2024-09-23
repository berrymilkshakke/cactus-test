import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GamesService} from '../../_core/services/games.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';
import {PlayerService} from '../../_core/services/player.service';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import * as screenfull from 'screenfull';
import {GameService} from '../../_core/services/game.service';
import {HelperService} from '../../_core/services/helper.service';
import {PlayerGamesService} from '../../_core/services/player-games.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerMoneyBonusesService} from '../../_core/services/player-money-bonuses.service';
import {LanguagesService} from '../../_core/services/languages.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';
import {PlayerFsBonusesService} from '../../_core/services/player-fs-bonuses.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentService} from '../../_core/services/content.service';
import {ChatService} from '../../_core/services/chat.service';


@Component({
  selector: 'app-layout-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameComponent implements OnInit, OnDestroy {

  @ViewChild('parentBlock', {static: true})
  parentBlock: ElementRef;

  private unsubscribe$: any = new Subject();

  // public resolutions;
  // public resolutionIndex = 0;

  // public gameWidth;
  // public gameHeight;

  public brandName: string;
  public gameName: string;
  public demo: string;

  public isHd: boolean = true;
  public isHtml: boolean;
  public htmlCode: any;
  public gameUrl: any;
  public gameTitle: string;

  public isRightScreenActive: boolean = false;
  public isRecentGamesActive: boolean = false;
  public isTopGamesActive: boolean = false;

  public screenFull: any;

  // public widthOffset1 = 370;
  // public widthOffset2 = 60;

  // public heightOffsetMobile1 = 192;
  // public heightOffsetMobile2 = 192;
  // public heightOffsetDesktop = 142;

  public intervalTimer: any = interval(10 * 1000);
  private intervalTimerSubscription: any;

  public favoriteGames: any;
  public gameData: any;

  public componentName: string = 'levels';
  public levels: any;

  public currentLevel: any;
  public nextLevel: any;

  public showFavorites: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,
              public gamesService: GamesService,
              public gameService: GameService,
              public sanitizer: DomSanitizer,
              public playerBonusesService: PlayerMoneyBonusesService,
              public router: Router,
              public playerService: PlayerService,
              public authGuard: AuthGuard,
              public helperService: HelperService,
              public playerGamesService: PlayerGamesService,
              public translateService: TranslateService,
              public notifierService: NotifierService,
              public languagesService: LanguagesService,
              public showModalService: ShowModalService,
              public playerFsBonusesService: PlayerFsBonusesService,
              public contentService: ContentService,
              public chatService: ChatService,
              public ngbModal: NgbModal) {

    this.setParameters();
    // this.screenFull = screenfull;

    (<any>window).gclose = this.closeGame;
    (<any>window).close = this.closeGame;
  }

  ngOnInit() {
    this.ngbModal.dismissAll();

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

    this.favoriteGames = this.playerGamesService.favoriteGames;
    this.playerGamesService.favoriteGamesReceivedEvent.subscribe(() => {
      this.favoriteGames = this.playerGamesService.favoriteGames;
    });

    this.playerGamesService.gameAddedToFavoritesEvent.subscribe(() => {
      this.gameData.liked = true;
    });

    this.playerGamesService.gameRemovedFromFavoritesEvent.subscribe(() => {
      this.gameData.liked = false;
    });

    this.gameService.reopenGameEvent.subscribe(() => {
      this.getGameData();
    });

    const that = this;

    this.intervalTimerSubscription = this.intervalTimer.subscribe(() => {
      if (that.playerBonusesService.activeBonus) {
        that.playerBonusesService.getActivePlayerMoneyBonus();
      }
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.unsubscribe$)
    ).subscribe(e => {
      this.setParameters();
      this.getGameData();
    });

    this.gamesService.gamesReceivedEvent.subscribe(() => {
      this.checkGameAllowed();
    });

    this.playerFsBonusesService.playerFsBonusesUpdatedEvent.subscribe(() => {
      this.checkGameAllowed();
    });

    this.playerService.exceededMaximumBetEvent.subscribe(() => {
      // this.closeGame();
      this.getGameData();
    });

    this.gameService.gameDataReceivedEvent.subscribe(() => {

      delete (this.htmlCode);
      delete (this.gameUrl);
      delete (this.isHtml);

      const gameData = this.gameService.gameData;

      if (gameData.unfinishedGame) {

        const urlWithoutParameters = this.helperService.getUrlWithoutParameters();
        this.router.navigate([
            urlWithoutParameters,
            {outlets: {game: [gameData.unfinishedGame.brandName, gameData.unfinishedGame.gameName]}}
          ]
        ).then(() => {
          this.showModalService.openModalMessage('modal.unfinished_game');
        });

        return;
      }

      const isHtml = gameData.isHtml;
      const isHd = gameData.isHd;

      if (isHtml) {
        this.htmlCode = this.sanitizer.bypassSecurityTrustHtml(gameData.data);
      }

      if (!isHtml) {
        this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(gameData.data);
      }

      this.isHtml = isHtml;
      this.isHd = isHd;

      /*
      if (!isHd) {
        this.resolutions = SystemConfig.resolutionsNotHd;
      } else {
        this.resolutions = SystemConfig.resolutionsHd;
      }
       */

      this.gameTitle = gameData.title;
      this.gameData = gameData;

      // this.setDefaultGameResolution();
    });

    // this.resolutions = SystemConfig.resolutionsNotHd;
    // this.setDefaultGameResolution();

    this.getGameData();
  }

  ngOnDestroy() {
    this.intervalTimerSubscription.unsubscribe();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.gameService.gameClosingEvent.emit();
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

  checkGameAllowed() {
    const game = this.gamesService.getGameByName(this.brandName, this.gameName);

    if (!game) {
      return true;
    }

    if (game.allowed === false) {
      this.closeGame();
      this.showModalService.openModalMessage('notifications.wagering_is_not_possible_in_the_slot');
    }

    if (this.playerFsBonusesService.activeBonus && (this.playerFsBonusesService.activeBonus.game_id !== game.id)) {
      this.closeGame();
      this.showModalService.openModalPlayFs(this.playerFsBonusesService.activeBonus);
    }
  }

  setParameters() {
    this.brandName = this.activatedRoute.snapshot.params['brandName'];
    this.gameName = this.activatedRoute.snapshot.params['gameName'];
    this.demo = this.activatedRoute.snapshot.params['demo'];
  }

  getGameData() {
    const gameService = this.gameService;
    let isDemo = false;

    if (typeof this.demo !== 'undefined') {
      isDemo = true;
    }

    if (isDemo) {
      gameService.getDemoGameData(this.brandName, this.gameName);
    } else {
      gameService.getGameData(this.brandName, this.gameName);
    }
  }

  /*
  setGameResolution(index) {

    const resolutions = this.resolutions;

    if (typeof this.resolutions[index] === 'undefined') {
      return false;
    }

    const parentBlockWidth = this.parentBlock.nativeElement.offsetWidth;
    const parentBlockHeight = this.parentBlock.nativeElement.offsetHeight;

    if (parentBlockWidth === 'undefined' || parentBlockHeight === 'undefined') {
      // Todo: log error
      return false;
    }

    let widthOffset = 0;
    let heightOffset = 0;
    if (parentBlockWidth < 800) {
      widthOffset = 0;
      heightOffset = 0;
    } else if (parentBlockWidth < 1197 && parentBlockHeight <= 600) {
      widthOffset = this.widthOffset2;
      heightOffset = this.heightOffsetMobile1;
    } else if (parentBlockWidth < 1197 && parentBlockHeight > 600) {
      widthOffset = this.widthOffset2;
      heightOffset = this.heightOffsetMobile2;
    } else {
      widthOffset = this.widthOffset1;
      heightOffset = this.heightOffsetDesktop;
    }

    if (parentBlockWidth < (resolutions[index].width + widthOffset)) {
      return false;
    }

    if (parentBlockHeight < (resolutions[index].height + heightOffset)) {
      return false;
    }

    this.gameWidth = resolutions[index].width;
    this.gameHeight = resolutions[index].height + 96;
    this.resolutionIndex = index;

    return true;
  }

  setDefaultGameResolution() {
    const resolutions = this.resolutions;

    let index;
    for (index in resolutions) {
      const i = Number(index);
      if (this.setGameResolution(i)) {
        return;
      }
    }
  }
   */

  onResize(event: any) {
    // this.setDefaultGameResolution();
  }

  closeGame() {
    const urlWithoutParameters = this.helperService.getUrlWithoutParameters();
    this.router.navigate([urlWithoutParameters, {outlets: {game: null}}]);
  }

  unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
  }

  reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
  }

  toggleScreenFull() {
    // if (this.screenFull.isEnabled) {
    //   this.screenFull.toggle();
    // }
    if (!this.screenFull) {
      this.screenFull = screenfull;
      this.screenFull.toggle();
    } else {
      this.screenFull.toggle();
      this.screenFull = false;
    }
  }

  toggleRightScreen() {
    this.isRightScreenActive = !this.isRightScreenActive;
  }

  toggleRecentGames() {
    const recentGames = this.playerGamesService.recentGames;

    if (!recentGames) {
      return;
    }

    if (recentGames.length === 0) {
      this.translateService.get('other.play_for_real_money').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });

      return;
    }

    this.isTopGamesActive = false;
    this.isRecentGamesActive = !this.isRecentGamesActive;
  }

  toggleTopGames() {
    const topGames = this.playerGamesService.topGames;

    if (!topGames) {
      return;
    }

    if (topGames.length === 0) {
      this.translateService.get('other.play_for_real_money').subscribe((text: string) => {
        this.notifierService.notify('success', text);
      });

      return;
    }

    this.isRecentGamesActive = false;
    this.isTopGamesActive = !this.isTopGamesActive;
  }

  /*
  @HostListener('window:message', ['$event']) onPostMessage(event) {
    if (event.data === 'closeGame' || event.data === 'close' || event.data.indexOf('GAME_MODE:LOBBY') >= 0) {
      this.closeGame();
    }
  }
  */

  continueTheGame() {
    this.gameService.reopenGameEvent.emit();
  }

  openChat() {
    this.chatService.openChat();
  }

  openPath(path: string) {
    this.router.navigate([{outlets: {game: null}}])
      .then(() => this.router.navigate([path]));
  }

  toggleLike(id: number, liked: boolean) {
    // this.gameData.liked = liked;
    if (liked) {
      this.playerGamesService.deleteGameFromFavorites(id);
    } else {
      this.playerGamesService.addGameToFavorites(id);
    }
  }

  isAuthorized() {
    return this.authGuard.isAuthorized();
  }

  getCurrentGroup() {
    return this.playerService.getCurrentGroup();
  }

  getCurrentGroupName() {
    return this.playerService.getCurrentGroupName();
  }

  getCurrentGroupProgress() {
    return this.playerService.getCurrentGroupProgress();
  }

  getPointsCountToNextLevel() {
    return this.playerService.pointsToNextLevel;
  }
}
