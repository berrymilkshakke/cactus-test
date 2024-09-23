import {DomainsConfig} from './domains.conf';


export const SystemConfig = {

  casinoTitle: 'Cactus Casino',

  depositPath: '/wallet/deposit',

  cdnAssetsSize: 's1',
  cdnBigAssetsSize: 's2',

  affiliateCookie: {
    linkCodeName: 'linkCode',
    clickIdName: 'clickId',
    expires: 30, // days
  },

  passwordMinLength: 6,

  showCookiesNotification: true,

  echoConfig: {
    userModel: 'players',
    notificationNamespace: '',
    options: {
      broadcaster: 'pusher',
      key: DomainsConfig.websockets.key,
      wsHost: DomainsConfig.websockets.host,
      authEndpoint: `${DomainsConfig.domain}/websocket/auth-player`,
      host: DomainsConfig.websockets.host,
      wsPort: DomainsConfig.websockets.port,
      wssPort: DomainsConfig.websockets.port,
      disableStats: true,
      namespace: '',
      enabledTransports: ['ws', 'wss'],
      encrypted: DomainsConfig.websockets.encrypted,
      // cluster: 'eu'
    }
  },

  receiveNewsletters: true,
  receiveBonus: true,

  defaultCurrencyCode: 'USD',

  recentWinsByCurrency: true,

  phoneNumberRegex: '^[0-9]{5,30}$',

  groupPaymentMethods: true,

};
