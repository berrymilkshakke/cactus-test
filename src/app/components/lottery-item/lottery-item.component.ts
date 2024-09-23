import {Component, Input, ViewEncapsulation} from '@angular/core';
import {LotteriesService} from '../../_core/services/lotteries.service';
import {AuthGuard} from '../../_core/guards/auth.guard';
import {PlayerService} from '../../_core/services/player.service';
import {LanguagesService} from '../../_core/services/languages.service';


@Component({
  selector: 'app-lottery-item',
  templateUrl: './lottery-item.component.html',
  styleUrls: ['./lottery-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LotteryItemComponent {

  @Input() lottery: any;
  @Input() pageName: string;

  constructor(public lotteriesService: LotteriesService,
              public authGuard: AuthGuard,
              public playerService: PlayerService,
              public languagesService: LanguagesService) {
  }

  errorHandler(event: any) {
    event.target.src = `assets/img/lotteries/lottery.webp`;
  }

  getImagePatch(image: string) {
    return this.lotteriesService.getImagePatch(image);
  }
}
