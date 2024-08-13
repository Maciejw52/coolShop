import React from 'react';
import { renderWithProvidersInEnv } from '@/utils/test-utils';
import { CreditCard } from './credit-card';
import { fireEvent, waitFor, act } from '@testing-library/react-native';
import { removeCardFromWalletKeychain } from '@/utils/keychain-utils';

jest.mock('@/utils/keychain-utils', () => ({
  getCardFromWalletKeychain: jest.fn(() =>
    Promise.resolve({
      cardId: 'random card id',
      cardNumber: '4563456345634563',
      cvv: '555',
      expiryDate: '12/12',
    }),
  ),
  removeCardFromWalletKeychain: jest.fn(() => Promise.resolve()),
}));

const mockDispatch = jest.fn();
jest.mock('@/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockCard = {
  cardId: '123',
  cardNumber: '**** 1234',
  color: 'blue',
};

describe('CreditCard Component', () => {
  const renderComponent = () =>
    renderWithProvidersInEnv(<CreditCard card={mockCard} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CreditCard component correctly', () => {
    const { getByTestId, getByText } = renderComponent();

    expect(getByTestId(`credit-card-${mockCard.cardNumber}`)).toBeTruthy();
    expect(getByText('COOL CREDIT :)')).toBeTruthy();
    expect(getByText(mockCard.cardNumber)).toBeTruthy();
  });

  it('should call removeCardFromWalletKeychain and dispatch removeCard when delete is pressed', async () => {
    const { getByTestId, getByLabelText } = renderComponent();

    await waitFor(() => {
      fireEvent.press(getByTestId(`credit-card-${mockCard.cardNumber}`));
    });

    act(() => {
      fireEvent(
        getByTestId(`credit-card-${mockCard.cardNumber}`),
        'onSwipeableWillOpen',
        { direction: 'right' },
      );
    });

    await waitFor(() => {
      act(() => {
        fireEvent.press(getByLabelText('Delete Card'));
      });

      expect(removeCardFromWalletKeychain).toHaveBeenCalledWith(
        mockCard.cardId,
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: '123',
        type: 'wallet/removeCard',
      });
    });
  });

  it('should reveal details when "View Card Details" is pressed', async () => {
    const { getByTestId, getByLabelText, getByText } = renderComponent();

    await waitFor(() => {
      fireEvent.press(getByTestId(`credit-card-${mockCard.cardNumber}`));
    });

    act(() => {
      fireEvent(
        getByTestId(`credit-card-${mockCard.cardNumber}`),
        'onSwipeableWillOpen',
        { direction: 'right' },
      );
    });

    await waitFor(() => {
      act(() => {
        fireEvent.press(getByLabelText('View Card Details'));
      });

      expect(getByText('CVV: 555')).toBeTruthy();
    });
  });
});
