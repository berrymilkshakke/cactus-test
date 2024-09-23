import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerGamesService} from '../../_core/services/player-games.service';


@Component({
  selector: 'app-recent-games-mobile',
  templateUrl: './recent-games-mobile.component.html',
  styleUrls: ['./recent-games-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecentGamesMobileComponent implements OnInit {

  public recentGames: any;

  constructor(public playerGamesService: PlayerGamesService) {}

  ngOnInit() {
    this.recentGames = this.playerGamesService.recentGames;
    this.playerGamesService.recentGamesReceivedEvent.subscribe(() => {
      this.recentGames = this.playerGamesService.recentGames;
    });
  }
}
