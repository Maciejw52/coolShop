import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { AppStore, RootState } from '@/store/store.interface';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { PaperProvider } from 'react-native-paper';
import { CombinedLightTheme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import { accountDataInitialState } from '@/store/slices/account-data-slice';
import { utilsInitialState } from '@/store/slices/utilities-slice';
import { walletInitialState } from '@/store/slices/wallet-slice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: (RootState & PersistPartial) | undefined;
  store?: AppStore;
}

export function renderWithProvidersInEnv(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
  withoutNavigation?: boolean,
) {
  const {
    preloadedState = {
      accountData: accountDataInitialState,
      wallet: walletInitialState,
      utils: utilsInitialState,
      _persist: {
        version: 0,
        rehydrated: true,
      },
    },
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren) => (
    <>
      {withoutNavigation ? (
        <PaperProvider theme={CombinedLightTheme}>
          <Provider store={store}>{children}</Provider>
        </PaperProvider>
      ) : (
        <NavigationContainer>
          <PaperProvider theme={CombinedLightTheme}>
            <Provider store={store}>{children}</Provider>
          </PaperProvider>
        </NavigationContainer>
      )}
    </>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
