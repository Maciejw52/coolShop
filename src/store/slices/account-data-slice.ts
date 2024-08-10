import { AccountDataState } from '@/app.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AccountDataState = {
  fullName: '',
  contactInfo: {
    email: '',
    phoneNumber: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
  },
};

export const accountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountDataState>) => {
      return action.payload;
    },
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

export const { setAccount, updateAccount, clearAccountData } =
  accountDataSlice.actions;

export default accountDataSlice.reducer;
