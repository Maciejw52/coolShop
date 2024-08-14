import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = MainAppNavigatorParamList &
  AccountStackParamList;

export type MainAppNavigatorParamList = {
  Shop: { initialRoute: boolean };
  BasketStack: undefined;
  AccountStack: undefined;
};

export type AccountStackParamList = {
  Account: { initialRoute: boolean };
  PersonalDetails: undefined;
  Wallet: undefined;
  AppSettings: undefined;
};

export type BasketStackParamList = {
  Basket: undefined;
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

export interface BasketItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
}

// API Interfaces and Types
export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}

export type Products = Product[];
