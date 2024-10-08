export type AccountOption = {
  title: string;
  icon: string;
  status?: 'error' | 'default';
  action: AccountActionOption;
};

export type AccountActionOption =
  | {
      type: 'navigate';
      destination: 'Account' | 'PersonalDetails' | 'Wallet' | 'AppSettings';
    }
  | {
      type: 'state-change';
      destination: string;
    };
