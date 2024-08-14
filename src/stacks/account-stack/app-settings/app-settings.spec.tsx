import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import { AppSettingsScreen } from './app-settings';
import { renderWithProvidersInEnv } from '@/utils/test-utils';

describe('App Settings Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPage = (preloadedState?: any) =>
    renderWithProvidersInEnv(<AppSettingsScreen />, { preloadedState });

  it('should render App Settings with title and radio buttons', () => {
    const { getByText } = renderPage();

    expect(getByText('Choose your preferred theme')).toBeTruthy();

    expect(getByText('Default')).toBeTruthy();
    expect(getByText('Dark')).toBeTruthy();
    expect(getByText('Light')).toBeTruthy();
  });

  it('should have the default theme selected on render', () => {
    const { getByTestId } = renderPage();

    const defaultRadioButton = getByTestId('default-radio-button');
    expect(defaultRadioButton.props.accessibilityState.checked).toBe(true);
  });

  it('should dispatch setTheme action when a radio button is pressed', async () => {
    const { store, getByTestId } = renderPage();

    const darkRadioButton = getByTestId('dark-radio-button');
    act(() => {
      fireEvent.press(darkRadioButton);
    });

    await waitFor(() => {
      expect(store.getState().utils.currentTheme).toBe('dark');
    });
  });

  it('should update the theme state when a radio button is pressed', async () => {
    const { getByTestId } = renderPage({
      utils: { currentTheme: 'light' },
    });

    const darkRadioButton = getByTestId('dark-radio-button');
    act(() => {
      fireEvent.press(darkRadioButton);
    });

    await waitFor(() => {
      const darkRadioButtonChecked = getByTestId('dark-radio-button');
      expect(darkRadioButtonChecked.props.accessibilityState.checked).toBe(
        true,
      );

      const lightRadioButton = getByTestId('light-radio-button');
      expect(lightRadioButton.props.accessibilityState.checked).toBe(false);
    });
  });
});
