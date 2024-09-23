import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerGamesService} from '../../_core/services/player-games.service';


@Component({
  selector: 'app-recent-games-desktop',
  templateUrl: './recent-games-desktop.component.html',
  styleUrls: ['./recent-games-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecentGamesDesktopComponent implements OnInit {

  public recentGames: any;

  constructor(public playerGamesService: PlayerGamesService) {}

  ngOnInit() {
    this.recentGames = this.playerGamesService.recentGames;
    this.playerGamesService.recentGamesReceivedEvent.subscribe(() => {
      this.recentGames = this.playerGamesService.recentGames;
    });
  }
}
