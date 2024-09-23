import {EventEmitter, Injectable, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {GamesService} from './games.service';
import {GameService} from './game.service';
import {AuthGuard} from '../guards/auth.guard';
import {AuthenticationService} from './authentication.service';
import {GamesDataSource} from '../datasources/games.datasource';


@Injectable({
  providedIn: 'root'
})
export class PlayerGamesService {

  public recentGamesIds: any;
  public recentGames: any;

  public topGamesIds: any;
  public topGames: any;

  public favoriteGamesIds: any;
  public favoriteGames: any;

  @Output() public recentGamesIdsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public recentGamesReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public topGamesIdsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public topGamesReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public favoriteGamesIdsReceivedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public favoriteGamesReceivedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public favoriteGamesUpdatedEvent: EventEmitter<boolean> = new EventEmitter();

  @Output() public gameAddedToFavoritesEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() public gameRemovedFromFavoritesEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public gamesDataSource: GamesDataSource,
              public gamesService: GamesService,
              public gameService: GameService,
              public authGuard: AuthGuard,
              public authenticationService: AuthenticationService) {

    gamesService.gamesReceivedEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getRecentGames();
        this.getTopGames();
        this.getFavoriteGames();
      }
    });

    authenticationService.authorizationEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getRecentGames();
        this.getTopGames();
        this.getFavoriteGames();
      }
    });

    gameService.gameClosingEvent.subscribe(() => {
      if (this.authGuard.isAuthorized()) {
        this.getRecentGames();
        this.getTopGames();
      }
    });

    gamesService.gamesUpdatedEvent.subscribe(() => {
      this.recentGames = this.sortGames(this.recentGamesIds);
      this.recentGamesReceivedEvent.emit();

      this.topGames = this.sortGames(this.topGamesIds);
      this.topGamesReceivedEvent.emit();

      this.favoriteGames = this.sortGames(this.favoriteGamesIds);
      this.favoriteGamesReceivedEvent.emit();
    });

    this.recentGamesIdsReceivedEvent.subscribe(() => {
      this.recentGames = this.sortGames(this.recentGamesIds);
      this.recentGamesReceivedEvent.emit();
    });

    this.topGamesIdsReceivedEvent.subscribe(() => {
      this.topGames = this.sortGames(this.topGamesIds);
      this.topGamesReceivedEvent.emit();
    });

    this.favoriteGamesIdsReceivedEvent.subscribe(() => {
      this.favoriteGames = this.sortGames(this.favoriteGamesIds);
      this.setFavoritesGames(this.favoriteGamesIds);
      this.favoriteGamesReceivedEvent.emit();
    });
  }

  sortGames(ids: any) {
    if (!ids) {
      return;
    }

    let games = [];
    for (const id of ids) {
      const game = this.gamesService.getGameById(id);
      if (game != null) {
        games.push(game);
      }
    }

    return games;
  }

  setFavoritesGames(ids: any) {
    if (!ids) {
      return;
    }

    for (const id of ids) {
      this.gamesService.setLikedFlag(id, true);
    }
  }

  getRecentGames() {
    this.gamesDataSource.getRecentGames()
      .pipe(first())
      .subscribe(
        data => {
          this.recentGamesIds = data;
          this.recentGamesIdsReceivedEvent.emit();
        });
  }

  getTopGames() {
    this.gamesDataSource.getTopGames()
      .pipe(first())
      .subscribe(
        data => {
          this.topGamesIds = data;
          this.topGamesIdsReceivedEvent.emit();
        });
  }

  getFavoriteGames() {
    this.gamesDataSource.getFavoriteGames()
      .pipe(first())
      .subscribe(
        data => {
          this.favoriteGamesIds = data;
          this.favoriteGamesIdsReceivedEvent.emit();
        });
  }

  addGameToFavorites(gameId: any) {
    this.gamesDataSource.addGameToFavorites(gameId)
      .pipe(first())
      .subscribe(
        data => {
          this.favoriteGamesIds.unshift(gameId);
          this.gamesService.setLikedFlag(gameId, true);
          this.favoriteGamesUpdatedEvent.emit();
          this.gameAddedToFavoritesEvent.emit(gameId);
        });
  }

  deleteGameFromFavorites(gameId: any) {
    this.gamesDataSource.deleteGameFromFavorites(gameId)
      .pipe(first())
      .subscribe(
        data => {
          this.favoriteGamesIds = this.favoriteGamesIds.filter(function (item: any) {
            return item !== gameId;
          });
          this.gamesService.setLikedFlag(gameId, false);
          this.favoriteGamesUpdatedEvent.emit();
          this.gameRemovedFromFavoritesEvent.emit(gameId);
        });
  }
}
