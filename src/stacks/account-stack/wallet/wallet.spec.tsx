import React from 'react';
import { renderWithProvidersInEnv } from '@/utils/test-utils';
import { WalletScreen } from './wallet';
import { fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@/utils/keychain-utils', () => ({
  removeCardFromWalletKeychain: jest.fn(() => Promise.resolve()),
}));

describe('Wallet Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPage = (preloadedState?: any) =>
    renderWithProvidersInEnv(<WalletScreen />, { preloadedState });

  it('should render the wallet screen with the "My Cards" heading', () => {
    const { getByText } = renderPage();

    expect(getByText('My Cards')).toBeTruthy();
  });

  it('should render the AddCreditCard component when there are no cards', () => {
    const preloadedState = {
      wallet: {
        noOfCards: 0,
        secureWallet: [],
      },
    };

    const { getByTestId } = renderPage(preloadedState);
    expect(getByTestId('card-number-input')).toBeTruthy();
    expect(getByTestId('expiry-date-input')).toBeTruthy();
    expect(getByTestId('cvv-input')).toBeTruthy();
  });

  it('should render the "Add" button when there are less than the maximum number of cards', async () => {
    const preloadedState = {
      wallet: {
        noOfCards: 2,
        secureWallet: [
          { cardId: '1', cardNumber: '**** 1111' },
          { cardId: '2', cardNumber: '**** 2222' },
        ],
      },
    };

    const { getByText } = renderPage(preloadedState);
    await waitFor(() => {
      expect(getByText('+ Add')).toBeTruthy();
    });
  });

  it('should not render the "Add" button when the maximum number of cards is reached', () => {
    const preloadedState = {
      wallet: {
        noOfCards: 6,
        secureWallet: [
          { cardId: '1', cardNumber: '**** 1111' },
          { cardId: '2', cardNumber: '**** 2222' },
          { cardId: '3', cardNumber: '**** 3333' },
          { cardId: '4', cardNumber: '**** 4444' },
          { cardId: '5', cardNumber: '**** 5555' },
          { cardId: '6', cardNumber: '**** 6666' },
        ],
      },
    };

    const { queryByText } = renderPage(preloadedState);

    expect(queryByText('+ Add')).toBeFalsy();
  });

  it('should render the CreditCard components when cards are present', () => {
    const mockCards = [
      { cardId: '1', cardNumber: '**** 1111' },
      { cardId: '2', cardNumber: '**** 2222' },
    ];

    const preloadedState = {
      wallet: {
        noOfCards: 2,
        secureWallet: mockCards,
      },
    };

    const { getByText } = renderPage(preloadedState);

    mockCards.forEach(card => {
      expect(getByText(card.cardNumber)).toBeTruthy();
    });
  });

  it('should show AddCreditCard component when the "Add" button is pressed', () => {
    const preloadedState = {
      wallet: {
        noOfCards: 2,
        secureWallet: [],
      },
    };

    const { getByText, getByTestId } = renderPage(preloadedState);

    const addButton = getByText('+ Add');
    fireEvent.press(addButton);

    expect(getByTestId('card-number-input')).toBeTruthy();
    expect(getByTestId('expiry-date-input')).toBeTruthy();
    expect(getByTestId('cvv-input')).toBeTruthy();
  });
});
