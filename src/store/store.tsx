import React, { PropsWithChildren } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountDataReducer from './slices/account-data-slice';
import { RootState } from './store.interface';
import { Provider } from 'react-redux';

export const rootReducer = combineReducers({
  accountData: accountDataReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={setupStore()}>{children}</Provider>;
};
