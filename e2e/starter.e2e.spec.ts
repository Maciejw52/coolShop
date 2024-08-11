import { expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the tab navigation', async () => {
    await expect(element(by.id('basket-tab-bar-button'))).toBeVisible();
    await expect(element(by.id('shop-tab-bar-button'))).toBeVisible();
    await expect(element(by.id('account-tab-bar-button'))).toBeVisible();
  });
});
