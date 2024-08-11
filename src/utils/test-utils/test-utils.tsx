import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { AppStore, RootState } from '@/store/store.interface';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
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
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
