import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlatformDetectorService} from '../../_core/services/platform-detector.service';
import {RecentWinsService} from '../../_core/services/recent-wins.service';


@Component({
  selector: 'app-recent-wins',
  templateUrl: './recent-wins.component.html',
  styleUrls: ['./recent-wins.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecentWinsComponent implements OnInit {

  @Input() public pageName: string;

  public recentWins: any;

  public slideConfig: any = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    vertical: false,
    arrows: false,
    dots: false,
    variableWidth: false
  };

  constructor(public platformDetectorService: PlatformDetectorService,
              public winnersService: RecentWinsService) {
  }

  ngOnInit() {
    this.recentWins = this.winnersService.recentWins;
    this.winnersService.recentWinsReceivedEvent.subscribe(() => {
      this.recentWins = this.winnersService.recentWins;
    });
  }
}
