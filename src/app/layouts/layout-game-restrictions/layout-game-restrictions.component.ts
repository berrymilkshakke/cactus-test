import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from '../../_core/services/player.service';


@Component({
  selector: 'app-layout-game-restrictions',
  templateUrl: './layout-game-restrictions.component.html',
  styleUrls: ['./layout-game-restrictions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutGameRestrictionsComponent implements OnInit {

  constructor(public playerService: PlayerService) {
    //
  }

  ngOnInit() {
  }
}
