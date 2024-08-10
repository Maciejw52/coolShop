import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import accountDataReducer from './slices/account-data-slice';

export const store = configureStore({
  reducer: {
    accountData: accountDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
