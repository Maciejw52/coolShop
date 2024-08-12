import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { WalletScreen } from './wallet';
import { NavigationContainer } from '@react-navigation/native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const renderPage = (preloadedState?: any) =>
  renderWithProviders(
    <NavigationContainer>
      <WalletScreen />
    </NavigationContainer>,
    { preloadedState },
  );

describe('Wallet Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the wallet page, with the appropriate inputs and headings', async () => {
    const { getByText, getByTestId } = renderPage();

    expect(getByText('My Cards')).toBeTruthy();

    expect(getByTestId('card-number-input')).toBeTruthy();
    expect(getByTestId('expiry-date-input')).toBeTruthy();
    expect(getByTestId('cvv-input')).toBeTruthy();
  });

  // it('should display Action Required if the specific account option in state is empty', async () => {
  //   const { getByTestId } = renderPage({
  //     accountData: {
  //       fullName: undefined,
  //       address: undefined,
  //       contactInfo: {
  //         email: undefined,
  //         phoneNumber: undefined,
  //       },
  //     },
  //     wallet: { noOfCards: 0 },
  //   });

  //   await waitFor(() => {
  //     expect(
  //       getByTestId('link-panel-action-required-Manage personal details'),
  //     ).toBeTruthy();
  //   });
  //   await waitFor(() => {
  //     expect(getByTestId('link-panel-action-required-Wallet')).toBeTruthy();
  //   });
  // });
});
