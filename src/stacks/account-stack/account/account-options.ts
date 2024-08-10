import { AccountOption } from './types';

export const accountOptionsData: AccountOption[][] = [
  [
    {
      title: 'Personal details',
      icon: 'account',
      action: {
        type: 'navigate',
        destination: 'PersonalDetails',
      },
    },
    {
      title: 'Card details',
      icon: 'credit-card',
      action: {
        type: 'navigate',
        destination: 'Cards',
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
      action: {
        type: 'state-change',
        destination: 'delete-data',
      },
    },
  ],
];
