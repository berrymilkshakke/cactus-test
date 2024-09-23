import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../_core/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    PipesModule
  ],
})
export class AppNotificationsModule {
}
