import { AccountDataState } from '@/app.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const accountDataInitialState: AccountDataState = {
  fullName: undefined,
  contactInfo: {
    email: undefined,
    phoneNumber: undefined,
  },
  address: undefined,
};

export const accountDataSlice = createSlice({
  name: 'accountData',
  initialState: accountDataInitialState,
  reducers: {
    updateAccount: (
      state,
      action: PayloadAction<Partial<AccountDataState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    clearAccountData: state => {
      Object.assign(state, accountDataInitialState);
    },
  },
});

export const { updateAccount, clearAccountData } = accountDataSlice.actions;

export default accountDataSlice.reducer;
