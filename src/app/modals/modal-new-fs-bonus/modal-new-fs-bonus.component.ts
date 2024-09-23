import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PlayerFsBonusesService} from '../../_core/services/player-fs-bonuses.service';
import {SystemConfig} from '../../_configs/system.conf';
import {Helper} from '../../_core/classes/helper';
import {FsBonusesService} from '../../_core/services/fs-bonuses.service';
import {GamesService} from '../../_core/services/games.service';
import {HelperService} from '../../_core/services/helper.service';
import {DomainsConfig} from '../../_configs/domains.conf';
import {Logger} from 'tslint/lib/runner';


@Component({
  selector: 'app-modal-new-fs-bonus',
  templateUrl: './modal-new-fs-bonus.component.html',
  styleUrls: ['./modal-new-fs-bonus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalNewFsBonusComponent implements OnInit {

  @Input() bonus: any;

  public cdnServer: any;

  constructor(public activeModal: NgbActiveModal,
              public playerFsBonusesService: PlayerFsBonusesService,
              public fsBonusesService: FsBonusesService,
              public helperService: HelperService,
              public gamesService: GamesService) {
    this.cdnServer = DomainsConfig.cdnServer;
  }

  ngOnInit() {
    this.playerFsBonusesService.playerFsBonusActivatedEvent.subscribe((bonusId: number) => {
      if (this.bonus.bonusId === bonusId) {
        this.bonus.activated = true;
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/bonuses/default_bonus.webp`;
  }

  activatePlayerFsBonus(bonusId: number) {
    this.playerFsBonusesService.activatePlayerFsBonus(bonusId);
  }

  getImagePatch(imageName: string) {
    return `${this.cdnServer}/promo/${imageName}`;
  }

  getGameImagePatch() {
    const gameId = this.fsBonusesService.getBonusOptionValue(this.bonus, 'game');

    if (!gameId) {
      return null;
    }

    const game = this.gamesService.getGameById(Helper.stringToJSON(gameId));

    if (!game) {
      return null;
    }

    const path = this.gamesService.getImagePatch(game.brand_name, game.image);

    return path;
  }

  getUrlWithoutParameters() {
    return this.helperService.getUrlWithoutParameters();
  }

  getUrlPathWithoutParameters(pathRequested: any) {
    return this.helperService.getUrlPathWithoutParameters(pathRequested);
  }
}
