import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecureCard {
  cardId: string;
  cardNumber: string;
  color: string;
}

interface WalletState {
  noOfCards: number;
  secureWallet: SecureCard[];
}

const initialState: WalletState = {
  noOfCards: 0,
  secureWallet: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<SecureCard>) => {
      // Need to add this card into the keychain
      state.secureWallet.push(action.payload);
      state.noOfCards = state.noOfCards + 1;
    },
    removeCard: (state, action: PayloadAction<string>) => {
      // Need to remove this card from the keychain as well
      state.secureWallet = state.secureWallet.filter(
        card => card.cardId !== action.payload,
      );
      state.noOfCards = state.noOfCards - 1;
    },
    clearWallet: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { addCard, removeCard, clearWallet } = walletSlice.actions;
export default walletSlice.reducer;
