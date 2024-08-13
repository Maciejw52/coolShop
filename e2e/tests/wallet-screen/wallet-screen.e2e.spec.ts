import { expect, element, by } from 'detox';

describe('Account - Wallet', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();

    await expect(element(by.id('account-tab-bar-button'))).toBeVisible();
    // Tap the account tab
    await element(by.id('account-tab-bar-button')).tap();
    // Expect the account title to be present
    await expect(element(by.text('My Account'))).toBeVisible();
    // Tap Manage Wallet
    await element(by.text('Wallet')).tap();
  });

  it('should navigate to the Wallet screen and show an option to add a card', async () => {
    // Check if the Wallet screen is displayed
    await expect(element(by.text('My Cards'))).toBeVisible();
    await expect(element(by.text('+ Add'))).toBeVisible();
  });

  it('should allow user to save a card', async () => {
    // Check if the Wallet screen is displayed
    await expect(element(by.text('My Cards'))).toBeVisible();
    await expect(element(by.text('+ Add'))).toBeVisible();

    await element(by.text('+ Add')).tap();

    await expect(element(by.id('card-number-input'))).toBeVisible();
    await expect(element(by.id('expiry-date-input'))).toBeVisible();
    await expect(element(by.id('cvv-input'))).toBeVisible();

    await element(by.id('card-number-input')).replaceText('1234123412341234');
    await element(by.id('expiry-date-input')).replaceText('12/12');
    await element(by.id('cvv-input')).replaceText('123');

    await element(by.text('Save Card')).tap();
    await expect(element(by.id('credit-card-**** 1234'))).toBeVisible();
  });

  it('should allow user to save a card and delete it', async () => {
    // Check if the Wallet screen is displayed
    await expect(element(by.text('My Cards'))).toBeVisible();
    await expect(element(by.text('+ Add'))).toBeVisible();

    await element(by.text('+ Add')).tap();

    await expect(element(by.id('card-number-input'))).toBeVisible();
    await expect(element(by.id('expiry-date-input'))).toBeVisible();
    await expect(element(by.id('cvv-input'))).toBeVisible();

    await element(by.id('card-number-input')).replaceText('3333444455556666');
    await element(by.id('expiry-date-input')).replaceText('10/12');
    await element(by.id('cvv-input')).replaceText('333');

    await element(by.text('Save Card')).tap();
    await expect(element(by.id('credit-card-**** 6666'))).toBeVisible();

    await element(by.id('credit-card-**** 6666')).swipe('left');
    await expect(element(by.id('delete-card-**** 6666'))).toBeVisible();
    await element(by.id('delete-card-**** 6666')).tap();

    await expect(element(by.id('credit-card-**** 6666'))).not.toExist();
  });

  it('should allow user to save a card and view its details when pressing the eye icon', async () => {
    // Check if the Wallet screen is displayed
    await expect(element(by.text('My Cards'))).toBeVisible();
    await expect(element(by.text('+ Add'))).toBeVisible();

    await element(by.text('+ Add')).tap();

    await expect(element(by.id('card-number-input'))).toBeVisible();
    await expect(element(by.id('expiry-date-input'))).toBeVisible();
    await expect(element(by.id('cvv-input'))).toBeVisible();

    await element(by.id('card-number-input')).replaceText('3333444455556666');
    await element(by.id('expiry-date-input')).replaceText('10/12');
    await element(by.id('cvv-input')).replaceText('333');

    await element(by.text('Save Card')).tap();
    await expect(element(by.id('credit-card-**** 6666'))).toBeVisible();
    await expect(element(by.id('CVV: 333'))).not.toBeVisible();

    await element(by.id('credit-card-**** 6666')).swipe('left');
    await expect(element(by.id('view-card-details-**** 6666'))).toBeVisible();
    await element(by.id('view-card-details-**** 6666')).tap();

    await expect(element(by.text('CVV: 333'))).toBeVisible();
  });
});
