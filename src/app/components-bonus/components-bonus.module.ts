import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {AppRoutingModule} from '../app-routing.module';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../_core/pipes/pipes.module';
import {MoneyBonusItemComponent} from './money-bonus-item/money-bonus-item.component';
import {FsBonusItemComponent} from './fs-bonus-item/fs-bonus-item.component';
import {PlayerMoneyBonusItemComponent} from './player-money-bonus-item/player-money-bonus-item.component';
import {PlayerFsBonusItemComponent} from './player-fs-bonus-item/player-fs-bonus-item.component';
import {BonusItemCurrenciesValueComponent} from './bonus-item-currencies-value/bonus-item-currencies-value.component';
import {BonusItemStringValueComponent} from './bonus-item-string-value/bonus-item-string-value.component';
import {BonusItemTimerComponent} from './bonus-item-timer/bonus-item-timer.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PlayerMoneyBonusHistoryItemComponent} from './player-money-bonus-history-item/player-money-bonus-history-item.component';
import {PlayerFsBonusHistoryItemComponent} from './player-fs-bonus-history-item/player-fs-bonus-history-item.component';
import {MoneyBonusSimpleItemComponent} from './money-bonus-simple-item/money-bonus-simple-item.component';
import {FsBonusSimpleItemComponent} from './fs-bonus-simple-item/fs-bonus-simple-item.component';
import {FsBonusBigItemComponent} from './fs-bonus-big-item/fs-bonus-big-item.component';
import {MoneyBonusBigItemComponent} from './money-bonus-big-item/money-bonus-big-item.component';
import {FsBonusModalItemComponent} from './fs-bonus-modal-item/fs-bonus-modal-item.component';
import {MoneyBonusModalItemComponent} from './money-bonus-modal-item/money-bonus-modal-item.component';
import {PlayerMoneyBonusModalItemComponent} from './player-money-bonus-modal-item/player-money-bonus-modal-item.component';
import {PlayerFsBonusModalItemComponent} from './player-fs-bonus-modal-item/player-fs-bonus-modal-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    SlickCarouselModule,
    VirtualScrollerModule,
    LazyLoadImageModule,
    TranslateModule,
    PipesModule,
    PerfectScrollbarModule
  ],
  declarations: [
    MoneyBonusItemComponent,
    FsBonusItemComponent,
    PlayerMoneyBonusItemComponent,
    PlayerFsBonusItemComponent,
    BonusItemCurrenciesValueComponent,
    BonusItemStringValueComponent,
    BonusItemTimerComponent,
    PlayerMoneyBonusHistoryItemComponent,
    PlayerFsBonusHistoryItemComponent,
    MoneyBonusSimpleItemComponent,
    FsBonusSimpleItemComponent,
    FsBonusBigItemComponent,
    MoneyBonusBigItemComponent,
    FsBonusModalItemComponent,
    MoneyBonusModalItemComponent,
    PlayerMoneyBonusModalItemComponent,
    PlayerFsBonusModalItemComponent
  ],
  exports: [
    MoneyBonusItemComponent,
    FsBonusItemComponent,
    PlayerMoneyBonusItemComponent,
    PlayerFsBonusItemComponent,
    BonusItemCurrenciesValueComponent,
    BonusItemStringValueComponent,
    BonusItemTimerComponent,
    PlayerMoneyBonusHistoryItemComponent,
    PlayerFsBonusHistoryItemComponent,
    MoneyBonusSimpleItemComponent,
    FsBonusSimpleItemComponent,
    FsBonusBigItemComponent,
    MoneyBonusBigItemComponent,
    FsBonusModalItemComponent,
    MoneyBonusModalItemComponent,
    PlayerMoneyBonusModalItemComponent,
    PlayerFsBonusModalItemComponent
  ],
})
export class ComponentsBonusModule {
}
