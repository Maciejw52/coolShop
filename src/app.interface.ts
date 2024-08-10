export type MainAppNavigatorParamList = {
  Shop: { initialRoute: boolean };
  Basket: undefined;
  AccountStack: undefined;
};

export type AccountStackParamList = {
  Account: { initialRoute: boolean };
  PersonalDetails: undefined;
  Cards: undefined;
  AppSettings: undefined;
};

// Slice Interfaces and Types
export interface ContactInfo {
  email?: string;
  phoneNumber?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface AccountDataState {
  fullName?: string;
  contactInfo?: ContactInfo;
  address?: Address;
}
