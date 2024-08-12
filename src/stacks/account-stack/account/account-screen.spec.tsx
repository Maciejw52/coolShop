import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { AccountScreen } from './account-screen';
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
      <AccountScreen />
    </NavigationContainer>,
    { preloadedState },
  );

describe('Account Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Account Screen and display account options upon navigation', async () => {
    const { findByTestId, getByText } = renderPage();

    const accountScreen = await findByTestId('account-screen');
    expect(accountScreen).toBeTruthy();
    expect(getByText('Account Options')).toBeTruthy();
    expect(getByText('Manage personal details')).toBeTruthy();
    expect(getByText('Wallet')).toBeTruthy();
  });

  it('should call navigate with the correct destination', async () => {
    const { getByText } = renderPage();

    expect(getByText('Manage personal details')).toBeTruthy();

    fireEvent.press(getByText('Manage personal details'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('PersonalDetails');
    });
  });

  it('should handle state-change action correctly', async () => {
    const { store, getByText } = renderPage({
      accountData: {
        fullName: 'Maciej',
        address: 'Flat 3343',
        contactInfo: {
          email: 'iwenfwef@kdnfwse',
          phoneNumber: '992837463',
        },
      },
      wallet: { noOfCards: 1 },
    });

    act(() => {
      fireEvent.press(getByText('Delete app data'));
    });

    await waitFor(() => {
      expect(store.getState().accountData.address).toBe(undefined);
      expect(store.getState().accountData.fullName).toBe(undefined);
      expect(store.getState().wallet.noOfCards).toBe(0);

      expect(getByText('App data deleted.')).toBeTruthy();
    });
  });

  it('should display Action Required if the specific account option in state is empty', async () => {
    const { getByTestId } = renderPage({
      accountData: {
        fullName: undefined,
        address: undefined,
        contactInfo: {
          email: undefined,
          phoneNumber: undefined,
        },
      },
      wallet: { noOfCards: 0 },
    });

    await waitFor(() => {
      expect(
        getByTestId('link-panel-action-required-Manage personal details'),
      ).toBeTruthy();
    });
    await waitFor(() => {
      expect(getByTestId('link-panel-action-required-Wallet')).toBeTruthy();
    });
  });
});
