import React, { PropsWithChildren } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountDataReducer from './slices/account-data-slice';
import { RootState } from './store.interface';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import type { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  accountData: accountDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: RootState & PersistPartial) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
    preloadedState,
  });
};

const store = setupStore();
const persistor = persistStore(store);
export { store, persistor };
