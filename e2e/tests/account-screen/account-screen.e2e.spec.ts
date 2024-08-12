import { expect, element, by } from 'detox';

describe('Account Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the account screen to user when pressing Account Tab button', async () => {
    await expect(element(by.id('account-tab-bar-button'))).toBeVisible();
    // Tap the account tab
    await element(by.id('account-tab-bar-button')).tap();
    // Expect the account title to be present
    await expect(element(by.text('My Account'))).toBeVisible();
  });

  it('should navigate to the Personal Details screen', async () => {
    await expect(element(by.id('account-tab-bar-button'))).toBeVisible();
    await element(by.id('account-tab-bar-button')).tap();
    await expect(element(by.text('My Account'))).toBeVisible();

    // Tap Manage personal details
    await element(by.text('Manage personal details')).tap();
    // Expect to be on the Personal Details screen
    await expect(element(by.text('Personal Details'))).toBeVisible();
    await expect(
      element(
        by.text(
          'We need the following details so we know where to send your order.',
        ),
      ),
    ).toBeVisible();
  });
});
