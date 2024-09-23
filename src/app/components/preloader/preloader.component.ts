import {Component, ViewEncapsulation} from '@angular/core';
import { PreloaderService } from 'src/app/_core/services/preloader.service';


@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreloaderComponent {

  constructor(public preloaderService: PreloaderService) {}

  getState() {
    return this.preloaderService.getState();
  }
}
