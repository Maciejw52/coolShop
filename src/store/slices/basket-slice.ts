import { BasketItem, BasketState } from '@/app.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const basketSliceInitialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState: basketSliceInitialState,
  reducers: {
    addItemToBasket: (state, action: PayloadAction<BasketItem>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearBasket: state => {
      state.items = [];
    },
  },
});

export const selectBasketTotal = (state: { basket: BasketState }) => {
  return state.basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};
export const { addItemToBasket, removeItemFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
