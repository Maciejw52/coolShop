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
    return Promise.reject('Could not save card to wallet');
  }
};

export const getCardFromWalletKeychain = async (cardId: string) => {
  try {
    const keychainStore = await Keychain.getGenericPassword();

    if (keychainStore) {
      const data = JSON.parse(keychainStore.password) as {
        wallet: Card[];
      };
      const card = data.wallet.find((c: Card) => c.cardId === cardId);

      return card || null;
    } else {
      return null;
    }
  } catch (error) {
    return Promise.reject('Could not find card in wallet');
  }
};

export const removeCardFromWalletKeychain = async (cardId: string) => {
  try {
    const keychainStore = await Keychain.getGenericPassword();

    if (keychainStore) {
      const currentWallet = JSON.parse(keychainStore.password) as {
        wallet: Card[];
      };
      const updatedWallet = {
        wallet: currentWallet.wallet.filter(card => card.cardId !== cardId),
      };

      await Keychain.setGenericPassword(
        'wallet',
        JSON.stringify(updatedWallet),
      );
    } else {
      return Promise.reject('Wallet not found');
    }
  } catch (error) {
    return Promise.reject('Could not delete card from wallet');
  }
};

export const purgeKeychainStorage = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    return Promise.reject('Failed to delete all cards');
  }
};
