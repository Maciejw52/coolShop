import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { AddCreditCard } from './add-credit-card';
import { NavigationContainer } from '@react-navigation/native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'test-uuid'),
}));

jest.mock('@/utils/keychain-utils', () => ({
  saveCardTWalletKeychain: jest.fn(),
}));

const mockOnCardSaved = jest.fn();

describe('AddCreditCard Component', () => {
  const renderPage = (preloadedState?: any) =>
    renderWithProviders(
      <NavigationContainer>
        <AddCreditCard onCardSaved={mockOnCardSaved} />
      </NavigationContainer>,
      { preloadedState },
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AddCreditCard component correctly', async () => {
    const { getByTestId } = renderPage();

    expect(getByTestId('card-number-input')).toBeTruthy();
    expect(getByTestId('expiry-date-input')).toBeTruthy();
    expect(getByTestId('cvv-input')).toBeTruthy();
  });

  it('should handle submission and run onCardSaved when the user presses Save Card', async () => {
    const { store, getByText, getByTestId } = renderPage();

    await waitFor(() => {
      fireEvent.changeText(
        getByTestId('card-number-input'),
        '7575757575757575',
      );
      fireEvent.changeText(getByTestId('expiry-date-input'), '12/34');
      fireEvent.changeText(getByTestId('cvv-input'), '123');
    });

    await waitFor(() => {
      expect(getByText('Save Card')).not.toBeDisabled();
      act(() => {
        fireEvent.press(getByText('Save Card'));
      });
      expect(mockOnCardSaved).toHaveBeenCalled();
      expect(store.getState().wallet.secureWallet).toContainEqual({
        cardId: 'test-uuid',
        cardNumber: '**** 7575',
        color: expect.any(String),
      });
    });
  });

  it('should disable the Save Card button if not all of the inputs are populated', async () => {
    const { getByText, getByTestId } = renderPage();

    await waitFor(() => {
      fireEvent.changeText(getByTestId('card-number-input'), '1234');
      fireEvent.changeText(getByTestId('expiry-date-input'), '12/34');
    });

    await waitFor(() => {
      expect(getByText('Save Card')).toBeDisabled();
    });
  });
});
