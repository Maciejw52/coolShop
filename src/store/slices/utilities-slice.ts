import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = 'default' | 'dark' | 'light';

interface utilsSliceState {
  currentTheme: ThemeState;
}

export const utilsInitialState: utilsSliceState = {
  currentTheme: 'default',
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState: utilsInitialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState>) {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = utilsSlice.actions;
export default utilsSlice.reducer;
