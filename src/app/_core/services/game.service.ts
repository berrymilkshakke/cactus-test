import {EventEmitter, Injectable, Output, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {PlatformDetectorService} from './platform-detector.service';
import {GameDataSource} from '../datasources/game.datasource';
import {GamePublicDataSource} from '../datasources/game-public.datasource';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameData: any;

  private navigator: any;

  @Output() public gameDataReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gameClosingEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public reopenGameEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public gameDataSource: GameDataSource,
              public gamePublicDataSource: GamePublicDataSource,
              public platformDetectorService: PlatformDetectorService) {
  }

  getGameData(brandName: string, gameName: string) {
    this.gameDataSource.getGameData(brandName, gameName, this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {
          this.gameData = data;

          this.gameDataReceivedEvent.emit();
        });
  }

  getDemoGameData(brandName: string, gameName: string) {
    this.gamePublicDataSource.getDemoGameData(brandName, gameName, this.platformDetectorService.platform)
      .pipe(first())
      .subscribe(
        data => {
          this.gameData = data;

          this.gameDataReceivedEvent.emit();
        });
  }

}
