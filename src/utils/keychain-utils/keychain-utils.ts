import * as Keychain from 'react-native-keychain';

interface Card {
  cardId: string;
  cardNumber: string;
  expire: string;
  cvv: string;
}

export const saveCardTWalletKeychain = async (newCard: Card) => {
  try {
    const keychainStore = await Keychain.getGenericPassword();
    let currentWallet: { wallet: Card[] } = { wallet: [] };

    if (keychainStore) {
      currentWallet = JSON.parse(keychainStore.password);
    }

    const updatedWallet = {
      wallet: [...currentWallet.wallet, newCard],
    };

    await Keychain.setGenericPassword('wallet', JSON.stringify(updatedWallet));
  } catch (error) {
    throw new Error('Failed to save card');
  }
};

export const getCardFromWalletKeychain = async (
  cardId: string,
): Promise<Card | null> => {
  try {
    const keychainStore = await Keychain.getGenericPassword();

    if (keychainStore) {
      const data = JSON.parse(keychainStore.password);
      const card = data.wallet.find((c: Card) => c.cardId === cardId);

      return card || null;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to retrieve card');
  }
};

export const purgeKeychainStorage = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    throw new Error('Failed to purge keychain storage');
  }
};
