import { AccountOption } from './types';

export const accountOptionsData: AccountOption[][] = [
  [
    {
      title: 'Manage personal details',
      icon: 'account',
      action: {
        type: 'navigate',
        destination: 'PersonalDetails',
      },
    },
    {
      title: 'Wallet',
      icon: 'credit-card',
      action: {
        type: 'navigate',
        destination: 'Wallet',
      },
    },
  ],
  [
    {
      title: 'App settings',
      icon: 'cog',
      action: {
        type: 'navigate',
        destination: 'AppSettings',
      },
    },
  ],
  [
    {
      title: 'Delete app data',
      icon: 'delete',
      status: 'error',
      action: {
        type: 'state-change',
        destination: 'delete-data',
      },
    },
  ],
];
