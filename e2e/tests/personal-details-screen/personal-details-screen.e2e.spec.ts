import { expect, element, by } from 'detox';

describe('Account - Personal Details', () => {
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
    // Tap Manage personal details
    await element(by.text('Manage personal details')).tap();
  });

  it('should navigate to the Personal Details screen', async () => {
    // Check if the Personal Details screen is displayed
    await expect(
      element(
        by.text(
          'We need the following details so we know where to send your order.',
        ),
      ),
    ).toBeVisible();
  });

  it('should update personal details and save them whilst also navigating back to the Account page', async () => {
    // Edit the fields with correct data
    await element(by.id('full-name-input')).typeText('John Doe');
    await element(by.id('email-input')).typeText('john.doe@example.com');
    await element(by.id('phone-number-input')).typeText('1234567890');
    await element(by.id('address-input')).typeText('Flat 32');
    await element(by.id('address-input')).tapReturnKey();
    await expect(element(by.text('Save'))).toBeVisible();
    // Save the details to the store
    await element(by.text('Save')).tap();
    // Expect the user to be navigated back
    await expect(element(by.text('My Account'))).toBeVisible();

    await expect(
      element(by.id('action-required-Manage personal details')),
    ).not.toBeVisible();
  });

  it.each([
    [
      'full-name-input',
      '123',
      'Mac donald',
      'Full Name must only contain letters and spaces',
    ],
    [
      'email-input',
      'Invalid email',
      'valid.email@example.com',
      'Invalid email address',
    ],
    [
      'phone-number-input',
      'text',
      '1234567890',
      'Phone Number must be a number',
    ],
  ])(
    'should show error message when invalid %s is entered into the form and hide error message when valid %s is entered',
    async (fieldName, invalidValue, validValue, errorMessage) => {
      // Enter an invalid text
      await element(by.id(fieldName)).replaceText(invalidValue);
      // Try to spress enter in form
      await element(by.id(fieldName)).tapReturnKey();
      // Check that an error message is shown for the field
      await expect(element(by.text(errorMessage))).toBeVisible();
      // Input a valid text
      await element(by.id(fieldName)).replaceText(validValue);
      // Try to spress enter in form
      await element(by.id(fieldName)).tapReturnKey();
      // Error message should disappear
      await expect(element(by.text(errorMessage))).not.toBeVisible();
    },
  );
});
