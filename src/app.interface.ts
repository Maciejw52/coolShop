import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = MainAppNavigatorParamList &
  AccountStackParamList;

export type MainAppNavigatorParamList = {
  Shop: { initialRoute: boolean };
  Basket: undefined;
  AccountStack: undefined;
};

export type AccountStackParamList = {
  Account: { initialRoute: boolean };
  PersonalDetails: undefined;
  Wallet: undefined;
  AppSettings: undefined;
};

// Account Stack Screen Types
export type AccountScreenProps = StackScreenProps<
  AccountStackParamList,
  'Account'
>;

export type PersonalDetailsScreenProps = StackScreenProps<
  AccountStackParamList,
  'PersonalDetails'
>;

// Slice Interfaces and Types
export interface ContactInfo {
  email?: string;
  phoneNumber?: string;
}

export interface AccountDataState {
  fullName?: string;
  contactInfo?: ContactInfo;
  address?: string;
}
