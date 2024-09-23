export class Menus {
  public static profileMenu: any = [
    {title: 'titles.profile_info', link: '/profile/info'},
    {title: 'menu.loyalty_program', link: '/profile/loyalty'},
    {title: 'titles.profile_documents', link: '/profile/documents'},
    {title: 'titles.profile_password', link: '/profile/password'},
  ];

  public static bonusesMenu: any = [
    {title: 'bonuses.active', link: '/bonuses/active'},
    {title: 'descriptions.profile_bonuses_available', link: '/bonuses/available'},
    {title: 'bonuses.history', link: '/bonuses/history'},
  ];

  public static tournamentsMenu: any = [
    {title: 'tournaments.active', link: '/tournaments/active'},
    {title: 'tournaments.finished', link: '/tournaments/finished'},
  ];

  public static lotteriesMenu: any = [
    {title: 'lotteries.active', link: '/lotteries/active'},
    {title: 'lotteries.finished', link: '/lotteries/finished'},
  ];

  public static jackpotsMenu: any = [
    {title: 'jackpots.active', link: '/jackpots/active'},
    {title: 'jackpots.finished', link: '/jackpots/finished'},
  ];

  public static walletMenu: any = [
    {title: 'titles.profile_deposit', link: '/wallet/deposit'},
    {title: 'titles.profile_withdrawal', link: '/wallet/withdrawal'},
    {title: 'other.accounts', link: '/wallet/accounts'},
    {title: 'titles.profile_history', link: '/wallet/history'},
  ];

  public static infoMenu: any = [
    {title: 'menu.registration', link: '/faq/registration'},
    {title: 'menu.deposit_and_withdrawal', link: '/faq/deposit'},
    {title: 'menu.bonuses', link: '/faq/bonuses'},
    {title: 'menu.loyalty_program', link: '/faq/loyalty'},
    {title: 'menu.general_questions', link: '/faq/general'},
  ];

  public static policiesMenu: any = [
    {title: 'menu.deposit_and_withdrawal', link: '/policies/deposit'},
    {title: 'menu.bonuses_and_actions', link: '/policies/bonuses'},
    {title: 'menu.vip_program', link: '/policiesvip'},
    {title: 'menu.cookies_usage', link: '/policies/cookies'},
    {title: 'menu.terms_and_conditions', link: '/policies/terms'},
    {title: 'menu.responsible-gaming', link: '/policies/gaming'},
    {title: 'titles.aml_policy', link: '/policies/aml'},
    {title: 'titles.privacy_policy', link: '/policies/privacy-policy'},
  ];

}
