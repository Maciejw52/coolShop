import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountDataReducer from './slices/account-data-slice';
import walletReducer from './slices/wallet-slice';
import utilsReducer from './slices/utilities-slice';
import basketReducer from './slices/basket-slice';
import { RootState } from './store.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import { productsApi } from '@/api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['basket'],
};

export const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  accountData: accountDataReducer,
  wallet: walletReducer,
  utils: utilsReducer,
  basket: basketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (
  preloadedState?: (RootState & PersistPartial) | undefined,
) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(productsApi.middleware),
    preloadedState,
  });
};

const store = setupStore();
const persistor = persistStore(store);

export { store, persistor };
