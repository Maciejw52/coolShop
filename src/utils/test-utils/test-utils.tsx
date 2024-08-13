import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { AppStore, RootState } from '@/store/store.interface';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { PaperProvider } from 'react-native-paper';
import { CombinedLightTheme } from '@/theme';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState> & PersistPartial;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren) => (
    <PaperProvider theme={CombinedLightTheme}>
      <Provider store={store}>{children}</Provider>
    </PaperProvider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
