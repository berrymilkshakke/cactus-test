import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutHomeComponent } from './layouts/layout-home/layout-home.component';
import { LayoutGamesComponent } from './layouts/layout-games/layout-games.component';
import { LayoutProfileComponent } from './layouts/layout-profile/layout-profile.component';
import { ProfileLoyaltyComponent } from './components/profile/profile-loyalty/profile-loyalty.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileDocumentsComponent } from './components/profile/profile-documents/profile-documents.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { LayoutBonusesComponent } from './layouts/layout-bonuses/layout-bonuses.component';
import { BonusesActiveComponent } from './components/bonuses/bonuses-active/bonuses-active.component';
import { BonusesAvailableComponent } from './components/bonuses/bonuses-available/bonuses-available.component';
import { BonusesHistoryComponent } from './components/bonuses/bonuses-history/bonuses-history.component';
import { LayoutTournamentsComponent } from './layouts/layout-tournaments/layout-tournaments.component';
import { TournamentsActiveComponent } from './components/tournaments/tournaments-active/tournaments-active.component';
import { TournamentsFinishedComponent } from './components/tournaments/tournaments-finished/tournaments-finished.component';
import { LayoutTournamentComponent } from './layouts/layout-tournament/layout-tournament.component';
import { LayoutLotteriesComponent } from './layouts/layout-lotteries/layout-lotteries.component';
import { LotteriesActiveComponent } from './components/lotteries/lotteries-active/lotteries-active.component';
import { LotteriesFinishedComponent } from './components/lotteries/lotteries-finished/lotteries-finished.component';
import { LayoutLotteryComponent } from './layouts/layout-lottery/layout-lottery.component';
import { LayoutWalletComponent } from './layouts/layout-wallet/layout-wallet.component';
import { WalletDepositComponent } from './components/wallet/wallet-deposit/wallet-deposit.component';
import { WalletWithdrawalComponent } from './components/wallet/wallet-withdrawal/wallet-withdrawal.component';
import { WalletAccountsComponent } from './components/wallet/wallet-accounts/wallet-accounts.component';
import { WalletHistoryComponent } from './components/wallet/wallet-history/wallet-history.component';
import { LayoutInfoComponent } from './layouts/layout-info/layout-info.component';
import { FaqRegistrationComponent } from './components/faq/faq-registration/faq-registration.component';
import { FaqDepositComponent } from './components/faq/faq-deposit/faq-deposit.component';
import { GameComponent } from './components/game/game.component';
import { OutletGuard } from './_core/guards/outlet.guard';
import { AuthGuard } from './_core/guards/auth.guard';
import { LayoutJackpotsComponent } from './layouts/layout-jackpots/layout-jackpots.component';
import { JackpotsFinishedComponent } from './components/jackpots/jackpots-finished/jackpots-finished.component';
import { JackpotsActiveComponent } from './components/jackpots/jackpots-active/jackpots-active.component';
import { LayoutPoliciesComponent } from './layouts/layout-policies/layout-policies.component';
import { FaqBonusesComponent } from './components/faq/faq-bonuses/faq-bonuses.component';
import { FaqLoyaltyComponent } from './components/faq/faq-loyalty/faq-loyalty.component';
import { FaqGeneralComponent } from './components/faq/faq-general/faq-general.component';
import { PoliciesDepositComponent } from './components/policies/policies-deposit/policies-deposit.component';
import { PoliciesBonusesComponent } from './components/policies/policies-bonuses/policies-bonuses.component';
import { PoliciesVipComponent } from './components/policies/policies-vip/policies-vip.component';
import { PoliciesCookiesComponent } from './components/policies/policies-cookies/policies-cookies.component';
import { PoliciesTermsComponent } from './components/policies/policies-terms/policies-terms.component';
import { PoliciesAmlComponent } from './components/policies/policies-aml/policies-aml.component';
import { PrivacyPolicyComponent } from './components/policies/privacy-policy/privacy-policy.component';
import { GameGuard } from './_core/guards/game.guard';
import { BonusesHistoryMoneyComponent } from './components/bonuses/bonuses-history/bonuses-history-money/bonuses-history-money.component';
import { BonusesHistoryFsComponent } from './components/bonuses/bonuses-history/bonuses-history-fs/bonuses-history-fs.component';
import { LayoutTestComponent } from './layouts/layout-test/layout-test.component';
import { PoliciesGamingComponent } from './components/policies/policies-gaming/policies-gaming.component';
import { LayoutGameRestrictionsComponent } from './layouts/layout-game-restrictions/layout-game-restrictions.component';
import { ModalContentComponent } from './modals/modal-content/modal-content.component';
import { ModalGuard } from './_core/guards/modal.guard';
import {LayoutApplicationComponent} from './layouts/layout-application/layout-application.component';


const routes: Routes = [

  {
    path: '',
    component: LayoutHomeComponent,
    // pathMatch: 'full',
    data: {
      title: '',
      description: '',
    },
  },

  /********************************************************************************************************************/

  {
    path: ':brandName/:gameName',
    component: GameComponent,
    canActivate: [AuthGuard, OutletGuard, GameGuard],
    outlet: 'game',
    data: {
      name: 'game',
    },
  },

  {
    path: ':demo/:brandName/:gameName',
    component: GameComponent,
    canActivate: [OutletGuard],
    outlet: 'game',
    data: {
      name: 'demo_game',
    },
  },

  /*******************************************************************************************************************/

  {
    path: 'games/:categoryName',
    component: LayoutGamesComponent,
    canActivate: [OutletGuard],
    data: {
      name: 'games',
    },

    children: [
      {
        path: ':brandName/:gameName',
        component: GameComponent,
        canActivate: [AuthGuard, OutletGuard, GameGuard],
        outlet: 'game',
        data: {
          name: 'game',
        },
      },

      {

        path: ':demo/:brandName/:gameName',
        component: GameComponent,
        canActivate: [OutletGuard],
        outlet: 'game',
        data: {
          name: 'demo_game',
        },
      },
    ],
  },

  {
    path: 'games/:categoryName/:brandName',
    component: LayoutGamesComponent,
    data: {
      name: 'games',
    },

    children: [
      {
        path: ':brandName/:gameName',
        component: GameComponent,
        canActivate: [AuthGuard, OutletGuard, GameGuard],
        outlet: 'game',
        data: {
          name: 'game',
        },
      },

      {
        path: ':demo/:brandName/:gameName',
        component: GameComponent,
        canActivate: [OutletGuard],
        outlet: 'game',
        data: {
          name: 'demo_game',
        },
      },
    ],
  },

  {
    path: 'faq',
    component: LayoutInfoComponent,
    canActivate: [OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'registration',
        pathMatch: 'full',
      },

      {
        path: 'registration',
        component: FaqRegistrationComponent,
        data: {
          name: 'info_registration',
        }
      },

      {
        path: 'deposit',
        component: FaqDepositComponent,
        data: {
          name: 'info_deposit',
        }
      },

      {
        path: 'bonuses',
        component: FaqBonusesComponent,
        data: {
          name: 'info_bonuses',
        }
      },

      {
        path: 'loyalty',
        component: FaqLoyaltyComponent,
        data: {
          name: 'info_loyalty',
        }
      },

      {
        path: 'general',
        component: FaqGeneralComponent,
        data: {
          name: 'info_general',
        }
      },
    ]
  },

  {
    path: 'policies',
    component: LayoutPoliciesComponent,
    canActivate: [OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'deposit',
        pathMatch: 'full',
      },

      {
        path: 'deposit',
        component: PoliciesDepositComponent,
        data: {
          name: 'policies_deposit',
        }
      },

      {
        path: 'bonuses',
        component: PoliciesBonusesComponent,
        data: {
          name: 'policies_bonuses',
        }
      },

      {
        path: 'vip',
        component: PoliciesVipComponent,
        data: {
          name: 'policies_vip',
        }
      },

      {
        path: 'cookies',
        component: PoliciesCookiesComponent,
        data: {
          name: 'policies_cookies',
        }
      },

      {
        path: 'terms',
        component: PoliciesTermsComponent,
        data: {
          name: 'policies_terms',
        }
      },

      {
        path: 'gaming',
        component: PoliciesGamingComponent,
        data: {
          name: 'policies_terms',
        }
      },

      {
        path: 'aml',
        component: PoliciesAmlComponent,
        data: {
          name: 'policies_aml',
        }
      },

      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          name: 'privacy_policy',
        },
      },
    ]
  },

  {
    path: 'tournaments',
    component: LayoutTournamentsComponent,
    canActivate: [OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },

      {
        path: 'active',
        component: TournamentsActiveComponent,
        data: {
          name: 'tournaments_active',
        }
      },

      {
        path: 'finished',
        component: TournamentsFinishedComponent,
        data: {
          name: 'tournaments_finished',
        }
      },
    ]
  },

  {
    path: 'tournament/:tournamentId',
    component: LayoutTournamentComponent,
    canActivate: [OutletGuard],
    data: {
      title: '',
      description: '',
    },

    children: [
      {
        path: ':brandName/:gameName',
        component: GameComponent,
        canActivate: [AuthGuard, OutletGuard, GameGuard],
        outlet: 'game',
        data: {
          name: 'game',
        },
      },

      {
        path: ':demo/:brandName/:gameName',
        component: GameComponent,
        canActivate: [OutletGuard],
        outlet: 'game',
        data: {
          name: 'demo_game',
        },
      },
    ],
  },

  {
    path: 'lotteries',
    component: LayoutLotteriesComponent,
    canActivate: [OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },

      {
        path: 'active',
        component: LotteriesActiveComponent,
        data: {
          name: 'lotteries_active',
        }
      },

      {
        path: 'finished',
        component: LotteriesFinishedComponent,
        data: {
          name: 'lotteries_finished',
        }
      },
    ]
  },

  {
    path: 'lotteries/:lotteryId',
    component: LayoutLotteryComponent,
    canActivate: [OutletGuard],
    data: {
      title: '',
      description: '',
    },
  },

  {
    path: 'jackpots',
    component: LayoutJackpotsComponent,
    canActivate: [OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },

      {
        path: 'active',
        component: JackpotsActiveComponent,
        data: {
          name: 'jackpots_active',
        }
      },

      {
        path: 'finished',
        component: JackpotsFinishedComponent,
        data: {
          name: 'jackpots_finished',
        }
      },
    ]
  },

  {
    path: 'test',
    component: LayoutTestComponent,
    canActivate: [OutletGuard],
    data: {
      name: 'test',
    },
  },

  {
    path: 'game-restrictions',
    component: LayoutGameRestrictionsComponent,
    data: {
      name: 'game-restrictions',
    },
  },

  {
    path: 'game-restriction',
    component: LayoutGameRestrictionsComponent,
    data: {
      name: 'game-restriction',
    },
  },

  {
    path: 'application',
    component: LayoutApplicationComponent,
    data: {
      name: 'application',
    },
  },

  /********************************************************************************************************************/

  {
    path: 'wallet',
    component: LayoutWalletComponent,
    canActivate: [AuthGuard, OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'deposit',
        pathMatch: 'full',
      },

      {
        path: 'deposit',
        component: WalletDepositComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'wallet_deposit',
        }
      },

      {
        path: 'withdrawal',
        component: WalletWithdrawalComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'wallet_withdrawal',
        }
      },

      {
        path: 'accounts',
        component: WalletAccountsComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'wallet_accounts',
        }
      },

      {
        path: 'history',
        component: WalletHistoryComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'wallet_history',
        }
      },
    ]
  },

  {
    path: 'bonuses',
    component: LayoutBonusesComponent,
    canActivate: [AuthGuard, OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },

      {
        path: 'active',
        component: BonusesActiveComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'bonuses_active',
        }
      },

      {
        path: 'available',
        component: BonusesAvailableComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'bonuses_available',
        }
      },

      {
        path: 'history',
        component: BonusesHistoryComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'bonuses_history',
        },

        children: [
          {
            path: '',
            redirectTo: 'money',
            pathMatch: 'full'
          },

          {
            path: 'money',
            component: BonusesHistoryMoneyComponent,
            canActivate: [AuthGuard, OutletGuard],
            data: {
              name: 'profile_bonuses_history_money',
            },
          },

          {
            path: 'fs',
            component: BonusesHistoryFsComponent,
            canActivate: [AuthGuard, OutletGuard],
            data: {
              name: 'profile_bonuses_history_fs',
            },
          },
        ]
      },
    ]
  },

  {
    path: 'profile',
    component: LayoutProfileComponent,
    canActivate: [AuthGuard, OutletGuard],
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },

      {
        path: 'info',
        component: ProfileInfoComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'profile_info',
        }
      },

      {
        path: 'loyalty',
        component: ProfileLoyaltyComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'profile_loyalty',
        }
      },

      {
        path: 'documents',
        component: ProfileDocumentsComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'profile_documents',
        }
      },

      {
        path: 'password',
        component: ProfilePasswordComponent,
        canActivate: [AuthGuard, OutletGuard],
        data: {
          name: 'profile_password',
        }
      },
    ]
  },

  /********************************************************************************************************************/

  {
    path: 'modal/:name',
    component: ModalContentComponent,
    canActivate: [ModalGuard],
  },

  /********************************************************************************************************************/

  {
    path: '',
    loadChildren: './redirects/redirects.module#RedirectsModule',
  },

  /********************************************************************************************************************/

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
