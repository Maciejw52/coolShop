import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountDataReducer from './slices/account-data-slice';
import walletReducer from './slices/wallet-slice';
import { RootState } from './store.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import type { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  accountData: accountDataReducer,
  wallet: walletReducer,
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
  });
};

const store = setupStore();
const persistor = persistStore(store);

export { store, persistor };
