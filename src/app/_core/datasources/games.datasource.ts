import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class GamesDataSource {

  constructor(public http: HttpClient) {
  }

  getRecentGames() {
    return this.http.get<any>(`${DomainsConfig.domain}/games/get-recent-games`);
  }

  getTopGames() {
    return this.http.get<any>(`${DomainsConfig.domain}/games/get-top-games`);
  }

  getFavoriteGames() {
    return this.http.get<any>(`${DomainsConfig.domain}/games/get-favorite-games`);
  }

  addGameToFavorites(gameId: number) {
    return this.http.put<any>(`${DomainsConfig.domain}/games/add-game-to-favorites/${gameId}`, {});
  }

  deleteGameFromFavorites(gameId: number) {
    return this.http.delete<any>(`${DomainsConfig.domain}/games/delete-game-from-favorites/${gameId}`);
  }

}
