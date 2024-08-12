import { AccountDataState } from '@/app.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AccountDataState = {
  fullName: undefined,
  contactInfo: {
    email: undefined,
    phoneNumber: undefined,
  },
  address: undefined,
};

export const accountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    updateAccount: (
      state,
      action: PayloadAction<Partial<AccountDataState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    clearAccountData: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateAccount, clearAccountData } = accountDataSlice.actions;

export default accountDataSlice.reducer;
