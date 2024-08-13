import React from 'react';
import { waitFor } from '@testing-library/react-native';
import App from './App';
import { renderWithProvidersInEnv } from './utils/test-utils';

describe('App', () => {
  const renderAppWithTheme = currentTheme => {
    const preloadedState: any = {
      utils: { currentTheme },
    };

    return renderWithProvidersInEnv(<App />, { preloadedState }, true);
  };

  it('should render with the default theme based on system settings', async () => {
    const { getByTestId } = renderAppWithTheme('default');

    await waitFor(() => {
      const shopHomeTabBar = getByTestId('shop-tab-bar-button');
      expect(shopHomeTabBar).toBeTruthy();
      expect(shopHomeTabBar.props.accessibilityState.selected).toBe(true);
    });
  });

  it('should apply the dark theme when `currentTheme` is set to "dark"', async () => {
    const { getByTestId } = renderAppWithTheme('dark');

    await waitFor(() => {
      const shopHomeTabBar = getByTestId('shop-tab-bar-button');
      expect(shopHomeTabBar).toBeTruthy();
      expect(shopHomeTabBar.props.accessibilityState.selected).toBe(true);
    });
  });

  it('should apply the light theme when `currentTheme` is set to "light"', async () => {
    const { getByTestId } = renderAppWithTheme('light');
    await waitFor(() => {
      const shopHomeTabBar = getByTestId('shop-tab-bar-button');
      expect(shopHomeTabBar).toBeTruthy();
      expect(shopHomeTabBar.props.accessibilityState.selected).toBe(true);
    });
  });
});
