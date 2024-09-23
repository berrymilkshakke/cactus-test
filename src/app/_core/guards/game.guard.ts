import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {PlayerFsBonusesService} from '../services/player-fs-bonuses.service';
import {GamesService} from '../services/games.service';
import {ShowModalService} from '../../modals/_services/show-modal.service';


@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  public brandName: string;
  public gameName: string;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public playerFsBonusesService: PlayerFsBonusesService,
              public gamesService: GamesService,
              public showModalService: ShowModalService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const nextOutlet = route.outlet;

    if (nextOutlet !== 'game') {
      return true;
    }

    this.brandName = route.paramMap.get('brandName');
    this.gameName = route.paramMap.get('gameName');

    const game = this.gamesService.getGameByName(this.brandName, this.gameName);

    if (!game) {
      return true;
    }

    if (game.allowed === false) {
      this.showModalService.openModalMessage('notifications.wagering_is_not_possible_in_the_slot');
      return false;
    }

    if (this.playerFsBonusesService.activeBonus && (this.playerFsBonusesService.activeBonus.game_id !== game.id)) {
      this.showModalService.openModalPlayFs(this.playerFsBonusesService.activeBonus);
      return false;
    }

    return true;
  }
}
