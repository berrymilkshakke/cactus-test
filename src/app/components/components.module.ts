import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BannersComponent} from './banners/banners.component';
import {GamesMenuComponent} from './games-menu/games-menu.component';
import {SearchHomeComponent} from './search-home/search-home.component';
import {RecentGamesMobileComponent} from './recent-games-mobile/recent-games-mobile.component';
import {SectionHeaderComponent} from './section-header/section-header.component';
import {JackpotItemComponent} from './jackpot-item/jackpot-item.component';
import {BonusesListComponent} from './bonuses-list/bonuses-list.component';
import {SeeMoreComponent} from './see-more/see-more.component';
import {GamesListComponent} from './games-list/games-list.component';
import {GameItemComponent} from './game-item/game-item.component';
import {BannerCardComponent} from './banner-card/banner-card.component';
import {DividerComponent} from './divider/divider.component';
import {MainMenuMobileComponent} from './main-menu-mobile/main-menu-mobile.component';
import {RecentGamesDesktopComponent} from './recent-games-desktop/recent-games-desktop.component';
import {MainMenuDesktopComponent} from './main-menu-desktop/main-menu-desktop.component';
import {SubheaderL1Component} from './subheader-l1/subheader-l1.component';
import {SubheaderL2Component} from './subheader-l2/subheader-l2.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {WarningComponent} from './warning/warning.component';
import {LoyaltyProgramComponent} from './loyalty-program/loyalty-program.component';
import {ProfileInfoComponent} from './profile/profile-info/profile-info.component';
import {ProfileLoyaltyComponent} from './profile/profile-loyalty/profile-loyalty.component';
import {AppFormsModule} from '../forms/forms.module';
import {ProfileDocumentsComponent} from './profile/profile-documents/profile-documents.component';
import {DocumentCategoryComponent} from './document-category/document-category.component';
import {DocumentUploadedComponent} from './document-uploaded/document-uploaded.component';
import {ProfilePasswordComponent} from './profile/profile-password/profile-password.component';
import {BonusesActiveComponent} from './bonuses/bonuses-active/bonuses-active.component';
import {BonusesAvailableComponent} from './bonuses/bonuses-available/bonuses-available.component';
import {BonusesHistoryComponent} from './bonuses/bonuses-history/bonuses-history.component';
import {SearchGamesComponent} from './search-games/search-games.component';
import {TournamentsActiveComponent} from './tournaments/tournaments-active/tournaments-active.component';
import {TournamentsFinishedComponent} from './tournaments/tournaments-finished/tournaments-finished.component';
import {LotteryItemComponent} from './lottery-item/lottery-item.component';
import {GoBackComponent} from './go-back/go-back.component';
import {LotteriesActiveComponent} from './lotteries/lotteries-active/lotteries-active.component';
import {LotteriesFinishedComponent} from './lotteries/lotteries-finished/lotteries-finished.component';
import {WalletAccountsComponent} from './wallet/wallet-accounts/wallet-accounts.component';
import {WalletDepositComponent} from './wallet/wallet-deposit/wallet-deposit.component';
import {WalletHistoryComponent} from './wallet/wallet-history/wallet-history.component';
import {WalletWithdrawalComponent} from './wallet/wallet-withdrawal/wallet-withdrawal.component';
import {InfoAlertComponent} from './info-alert/info-alert.component';
import {FaqRegistrationComponent} from './faq/faq-registration/faq-registration.component';
import {FaqItemComponent} from './faq-item/faq-item.component';
import {FaqDepositComponent} from './faq/faq-deposit/faq-deposit.component';
import {SubheaderL3Component} from './subheader-l3/subheader-l3.component';
import {TranslateModule} from '@ngx-translate/core';
import {LoyaltyItemComponent} from './loyalty-item/loyalty-item.component';
import {RecentWinsComponent} from './recent-wins/recent-wins.component';
import {GameComponent} from './game/game.component';
import {JackpotsActiveComponent} from './jackpots/jackpots-active/jackpots-active.component';
import {JackpotsFinishedComponent} from './jackpots/jackpots-finished/jackpots-finished.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {GamesListCarouselComponent} from './games-list-carousel/games-list-carousel.component';
import {NgbDropdownModule, NgbModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FaqBonusesComponent} from './faq/faq-bonuses/faq-bonuses.component';
import {FaqLoyaltyComponent} from './faq/faq-loyalty/faq-loyalty.component';
import {FaqGeneralComponent} from './faq/faq-general/faq-general.component';
import {PoliciesDepositComponent} from './policies/policies-deposit/policies-deposit.component';
import {PoliciesBonusesComponent} from './policies/policies-bonuses/policies-bonuses.component';
import {PoliciesVipComponent} from './policies/policies-vip/policies-vip.component';
import {PoliciesCookiesComponent} from './policies/policies-cookies/policies-cookies.component';
import {PoliciesTermsComponent} from './policies/policies-terms/policies-terms.component';
import {PoliciesAmlComponent} from './policies/policies-aml/policies-aml.component';
import {PrivacyPolicyComponent} from './policies/privacy-policy/privacy-policy.component';
import {BalanceDetailsComponent} from './balance-details/balance-details.component';
import {TournamentItemComponent} from './tournament-item/tournament-item.component';
import {GameItemSimpleComponent} from './game-item-simple/game-item-simple.component';
import {CurrencySelectRadioComponent} from './currency-select-radio/currency-select-radio.component';
import {PipesModule} from '../_core/pipes/pipes.module';
import {LanguageSelectComponent} from './language-select/language-select.component';
import {CountdownTimerComponent} from './countdown-timer/countdown-timer.component';
import {ContentComponent} from './content/content.component';
import {SelectedProvidersComponent} from './selected-providers/selected-providers.component';
import {ComponentsBonusModule} from '../components-bonus/components-bonus.module';
import {BonusesHistoryFsComponent} from './bonuses/bonuses-history/bonuses-history-fs/bonuses-history-fs.component';
import {BonusesHistoryMoneyComponent} from './bonuses/bonuses-history/bonuses-history-money/bonuses-history-money.component';
import {ChatComponent} from './chat/chat.component';
import {BannerLoginComponent} from './banner-login/banner-login.component';
import {BannerRegistrationComponent} from './banner-registration/banner-registration.component';
import {PoliciesGamingComponent} from './policies/policies-gaming/policies-gaming.component';
import {JackpotFinishedItemComponent} from './jackpots/jackpot-finished-item/jackpot-finished-item.component';
import {JackpotActiveItemComponent} from './jackpots/jackpot-active-item/jackpot-active-item.component';
import {NoDepositConditionsComponent} from './no-deposit-conditions/no-deposit-conditions.component';
import {GamesListSearchComponent} from './games-list-search/games-list-search.component';
import {GamesListStaticComponent} from './games-list-static/games-list-static.component';
import {NgSwitcheryModule} from 'angular-switchery-ios';
import {GamesListHomeComponent} from './games-list-home/games-list-home.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {PreloaderComponent} from './preloader/preloader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    AppFormsModule,
    TranslateModule,
    SlickCarouselModule,
    NgbDropdownModule,
    PerfectScrollbarModule,
    NgbProgressbarModule,
    PipesModule,
    ComponentsBonusModule,
    NgSwitcheryModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannersComponent,
    GamesMenuComponent,
    SearchHomeComponent,
    RecentGamesMobileComponent,
    RecentGamesDesktopComponent,
    SectionHeaderComponent,
    JackpotItemComponent,
    RecentWinsComponent,
    BonusesListComponent,
    SeeMoreComponent,
    GamesListComponent,
    GamesListSearchComponent,
    GamesListCarouselComponent,
    GameItemComponent,
    GameItemSimpleComponent,
    BannerCardComponent,
    DividerComponent,
    MainMenuMobileComponent,
    MainMenuDesktopComponent,
    SubheaderL1Component,
    SubheaderL2Component,
    SubheaderL3Component,
    SubmenuComponent,
    WarningComponent,
    LoyaltyProgramComponent,
    LoyaltyItemComponent,
    ProfileInfoComponent,
    ProfileLoyaltyComponent,
    ProfileDocumentsComponent,
    DocumentCategoryComponent,
    DocumentUploadedComponent,
    ProfilePasswordComponent,
    BonusesActiveComponent,
    BonusesAvailableComponent,
    BonusesHistoryComponent,
    SearchGamesComponent,
    TournamentsActiveComponent,
    TournamentsFinishedComponent,
    TournamentItemComponent,
    LotteryItemComponent,
    GoBackComponent,
    LotteriesActiveComponent,
    LotteriesFinishedComponent,
    WalletAccountsComponent,
    WalletDepositComponent,
    WalletHistoryComponent,
    WalletWithdrawalComponent,
    InfoAlertComponent,
    FaqRegistrationComponent,
    FaqItemComponent,
    FaqDepositComponent,
    GameComponent,
    JackpotsActiveComponent,
    JackpotsFinishedComponent,
    FaqBonusesComponent,
    FaqLoyaltyComponent,
    FaqGeneralComponent,
    PoliciesDepositComponent,
    PoliciesBonusesComponent,
    PoliciesVipComponent,
    PoliciesCookiesComponent,
    PoliciesTermsComponent,
    PoliciesAmlComponent,
    PrivacyPolicyComponent,
    PoliciesGamingComponent,
    BalanceDetailsComponent,
    CurrencySelectRadioComponent,
    LanguageSelectComponent,
    CountdownTimerComponent,
    ContentComponent,
    SelectedProvidersComponent,
    BonusesHistoryFsComponent,
    BonusesHistoryMoneyComponent,
    ChatComponent,
    BannerLoginComponent,
    BannerRegistrationComponent,
    JackpotActiveItemComponent,
    JackpotFinishedItemComponent,
    NoDepositConditionsComponent,
    GamesListStaticComponent,
    GamesListHomeComponent,
    ForbiddenComponent,
    PreloaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannersComponent,
    GamesMenuComponent,
    SearchHomeComponent,
    RecentGamesMobileComponent,
    RecentGamesDesktopComponent,
    SectionHeaderComponent,
    JackpotItemComponent,
    RecentWinsComponent,
    BonusesListComponent,
    SeeMoreComponent,
    GamesListComponent,
    GamesListSearchComponent,
    GamesListCarouselComponent,
    GameItemComponent,
    GameItemSimpleComponent,
    BannerCardComponent,
    DividerComponent,
    MainMenuMobileComponent,
    MainMenuDesktopComponent,
    SubheaderL1Component,
    SubheaderL2Component,
    SubheaderL3Component,
    SubmenuComponent,
    WarningComponent,
    LoyaltyProgramComponent,
    LoyaltyItemComponent,
    ProfileInfoComponent,
    ProfileLoyaltyComponent,
    ProfileDocumentsComponent,
    DocumentCategoryComponent,
    DocumentUploadedComponent,
    ProfilePasswordComponent,
    BonusesActiveComponent,
    BonusesAvailableComponent,
    BonusesHistoryComponent,
    SearchGamesComponent,
    TournamentsActiveComponent,
    TournamentsFinishedComponent,
    TournamentItemComponent,
    LotteryItemComponent,
    GoBackComponent,
    LotteriesActiveComponent,
    LotteriesFinishedComponent,
    WalletAccountsComponent,
    WalletDepositComponent,
    WalletHistoryComponent,
    WalletWithdrawalComponent,
    InfoAlertComponent,
    FaqRegistrationComponent,
    FaqItemComponent,
    FaqDepositComponent,
    GameComponent,
    JackpotsActiveComponent,
    JackpotsFinishedComponent,
    FaqBonusesComponent,
    FaqLoyaltyComponent,
    FaqGeneralComponent,
    PoliciesDepositComponent,
    PoliciesBonusesComponent,
    PoliciesVipComponent,
    PoliciesCookiesComponent,
    PoliciesTermsComponent,
    PoliciesAmlComponent,
    PrivacyPolicyComponent,
    PoliciesGamingComponent,
    BalanceDetailsComponent,
    CurrencySelectRadioComponent,
    LanguageSelectComponent,
    CountdownTimerComponent,
    ContentComponent,
    SelectedProvidersComponent,
    BonusesHistoryFsComponent,
    BonusesHistoryMoneyComponent,
    ChatComponent,
    BannerLoginComponent,
    BannerRegistrationComponent,
    JackpotActiveItemComponent,
    JackpotFinishedItemComponent,
    NoDepositConditionsComponent,
    GamesListStaticComponent,
    GamesListHomeComponent,
    ForbiddenComponent,
    PreloaderComponent
  ],
})
export class ComponentsModule {
}
