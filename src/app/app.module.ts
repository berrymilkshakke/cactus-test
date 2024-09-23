import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {CookieService} from 'ngx-cookie-service';
import {ComponentsModule} from './components/components.module';
import {AppFormsModule} from './forms/forms.module';
import {Router, Scroll, Event as NavigationEvent} from '@angular/router';
import {CommonModule, registerLocaleData, ViewportScroller} from '@angular/common';
import {filter} from 'rxjs/operators';
import localeRu from '@angular/common/locales/ru';
import {AppModalsModule} from './modals/modals.module';
import {LayoutHomeComponent} from './layouts/layout-home/layout-home.component';
import {LayoutGamesComponent} from './layouts/layout-games/layout-games.component';
import {EchoConfig, NgxLaravelEchoModule} from 'ngx-laravel-echo';
import {SystemConfig} from './_configs/system.conf';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {LayoutProfileComponent} from './layouts/layout-profile/layout-profile.component';
import {LayoutBonusesComponent} from './layouts/layout-bonuses/layout-bonuses.component';
import {LayoutTournamentsComponent} from './layouts/layout-tournaments/layout-tournaments.component';
import {LayoutTournamentComponent} from './layouts/layout-tournament/layout-tournament.component';
import {LayoutLotteriesComponent} from './layouts/layout-lotteries/layout-lotteries.component';
import {LayoutLotteryComponent} from './layouts/layout-lottery/layout-lottery.component';
import {LayoutWalletComponent} from './layouts/layout-wallet/layout-wallet.component';
import {NgSwitcheryModule} from 'angular-switchery-ios';
import {AppNotificationsModule} from './notifications/notifications.module';
import {RedirectsModule} from './redirects/redirects.module';
import {AuthenticationService} from './_core/services/authentication.service';
import {LanguagesService} from './_core/services/languages.service';
import {JwtInterceptor} from './_core/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_core/interceptors/error.interceptor';
import {LayoutInfoComponent} from './layouts/layout-info/layout-info.component';
import {LayoutPoliciesComponent} from './layouts/layout-policies/layout-policies.component';
import {LayoutJackpotsComponent} from './layouts/layout-jackpots/layout-jackpots.component';
import {HelperService} from './_core/services/helper.service';
import {LayoutTestComponent} from './layouts/layout-test/layout-test.component';
import {LanguageFilesVersion} from './_configs/version.conf.json';
import {LayoutGameRestrictionsComponent} from './layouts/layout-game-restrictions/layout-game-restrictions.component';
import { LayoutApplicationComponent } from './layouts/layout-application/layout-application.component';
import { OneSignal } from 'onesignal-ngx';
// import { ServiceWorkerModule } from '@angular/service-worker';


registerLocaleData(localeRu, 'ru');


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
    VirtualScrollerModule,
    LoadingBarHttpClientModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    NgSwitcheryModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
        }
      },
      behaviour: {
        // autoHide: false,
        autoHide: 20000
      }
    }),

    NgxLaravelEchoModule.forRoot(SystemConfig.echoConfig),

    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production 
    // }),

    AppRoutingModule,
    AppFormsModule,
    AppModalsModule,
    AppNotificationsModule,
    ComponentsModule,
    RedirectsModule,

    PerfectScrollbarModule
  ],
  declarations: [
    AppComponent,
    // HeaderFixedDirective,

    LayoutHomeComponent,
    LayoutProfileComponent,
    LayoutGamesComponent,
    LayoutBonusesComponent,
    LayoutTournamentsComponent,
    LayoutTournamentComponent,
    LayoutLotteriesComponent,
    LayoutLotteryComponent,
    LayoutWalletComponent,
    LayoutInfoComponent,
    LayoutJackpotsComponent,
    LayoutPoliciesComponent,
    LayoutTestComponent,
    LayoutGameRestrictionsComponent,
    LayoutApplicationComponent
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    LanguagesService,
    CookieService,
    Title,
    OneSignal
  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {


  public previousUrl = this.router.url;

  constructor(private router: Router,
              private viewportScroller: ViewportScroller,
              public helperService: HelperService) {

    router.events.pipe(
      filter((e: NavigationEvent): e is Scroll => e instanceof Scroll)
    ).subscribe((e: any) => {

      const previousUrl = this.previousUrl;
      const currentUrl = this.router.url;
      this.previousUrl = currentUrl;

      const previousPage = helperService.getPageNameFromPath(previousUrl);
      const currentPage = helperService.getPageNameFromPath(currentUrl);

      if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else if (e.anchor) {
        // anchor navigation
        viewportScroller.scrollToAnchor(e.anchor);
      } else {

        if (
          !HelperService.isGamesPageFromUrl(previousUrl) &&
          !HelperService.isGamesPageFromUrl(currentUrl) // &&
          // (((previousPage === 'games') && !(currentPage === 'games')) ||
          //  (!(previousPage === 'games') && !(currentPage === 'games')) ||
          //  (!(previousPage === 'games') && (currentPage === 'games')))
        ) {
          viewportScroller.scrollToPosition([0, 0]);
        }

        /*
        if (
          !HelperService.isGamesPageFromUrl(previousUrl) &&
          !HelperService.isGamesPageFromUrl(currentUrl)
        ) {
          viewportScroller.scrollToPosition([0, 0]);
        }

        if (
          !HelperService.isGamesPageFromUrl(previousUrl) &&
          !HelperService.isGamesPageFromUrl(currentUrl) &&
          (currentPage === 'games')
        ) {
          console.log('scroll');
          viewportScroller.scrollToPosition([0, 600]);
        }
         */

      }
    });
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  const languageFilesVersion = LanguageFilesVersion;
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?v=' + languageFilesVersion);
}
