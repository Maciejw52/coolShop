import React from 'react';

import { AccountScreen } from './account-screen';
import { accountOptionsData } from './account-options';
import { store } from '@/store';
import { renderWithProviders } from '@/utils/test-utils';
import App from '@/app';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('AccountScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render AccountScreen and display account options', () => {
    const { getByTestId } = renderWithProviders(<App />);

    expect(getByTestId('account-screen-sections-title')).toHaveTextContent(
      'Account Options',
    );

    accountOptionsData.forEach((section, index) => {
      section.forEach(option => {
        expect(getByTestId(`account-option-${option.title}`)).toBeTruthy();
      });
    });

    // Check if the snackbar is initially not visible
    expect(getByTestId('account-snackbar')).not.toBeVisible();
  });

  // Additional tests for interaction
  it('should show snackbar when account data is cleared', () => {
    const { getByTestId, getByText } = renderWithProviders(<App />);

    // Mocking a dispatch action
    store.dispatch({
      type: 'CLEAR_ACCOUNT_DATA',
    });

    // Simulate the action that triggers snackbar
    // Ensure the Snackbar is visible
    expect(getByTestId('account-snackbar')).toBeVisible();
    expect(getByText('App data deleted.')).toBeTruthy();
  });
});
