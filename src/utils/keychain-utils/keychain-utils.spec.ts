import * as Keychain from 'react-native-keychain';
import {
  saveCardTWalletKeychain,
  getCardFromWalletKeychain,
  purgeKeychainStorage,
  removeCardFromWalletKeychain,
} from './keychain-utils';

jest.mock('react-native-keychain');

describe('Keychain Utilities', () => {
  const mockCard = {
    cardId: '123',
    cardNumber: '4111111111111111',
    expire: '12/25',
    cvv: '123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveCardTWalletKeychain', () => {
    it('should save a new card to the wallet', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce({
        password: JSON.stringify({ wallet: [] }),
      });

      await saveCardTWalletKeychain(mockCard);

      expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
        'wallet',
        JSON.stringify({ wallet: [mockCard] }),
      );
    });

    it('should return a rejection if saving fails', async () => {
      (Keychain.setGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('Failed'),
      );

      await expect(saveCardTWalletKeychain(mockCard)).rejects.toEqual(
        'Could not save card to wallet',
      );
    });
  });

  describe('getCardFromWalletKeychain', () => {
    it('should retrieve a card by its cardId', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce({
        password: JSON.stringify({ wallet: [mockCard] }),
      });

      const card = await getCardFromWalletKeychain('123');

      expect(card).toEqual(mockCard);
    });

    it('should return null if the card is not found', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce({
        password: JSON.stringify({ wallet: [mockCard] }),
      });

      const card = await getCardFromWalletKeychain('999');

      expect(card).toBeNull();
    });

    it('should return a rejection if retrieval fails', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('Failed'),
      );

      await expect(getCardFromWalletKeychain('123')).rejects.toEqual(
        'Could not find card in wallet',
      );
    });
  });

  describe('purgeKeychainStorage', () => {
    it('should purge the keychain storage', async () => {
      await purgeKeychainStorage();

      expect(Keychain.resetGenericPassword).toHaveBeenCalled();
    });

    it('should return a rejection if purging fails', async () => {
      (Keychain.resetGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('Failed'),
      );

      await expect(purgeKeychainStorage()).rejects.toEqual(
        'Failed to delete all cards',
      );
    });
  });

  describe('removeCardFromWalletKeychain', () => {
    it('should return a rejection if no wallet is found', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce(null);

      await expect(removeCardFromWalletKeychain('123')).rejects.toEqual(
        'Wallet not found',
      );
    });

    it('should return a rejection if removal fails', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('Failed'),
      );

      await expect(removeCardFromWalletKeychain('123')).rejects.toEqual(
        'Could not delete card from wallet',
      );
    });
  });
});
