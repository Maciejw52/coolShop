import { AccountStackParamList, AccountStackScreens } from '@/app.interface';

export type AccountOption = {
  title: string;
  icon: string;
  action: {
    type: 'navigate' | 'state-change';
    destination: 'Account' | 'PersonalDetails' | 'Cards' | 'AppSettings';
  };
};
