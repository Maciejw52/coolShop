import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { PersonalDetailsScreen } from './personal-details';
import { NavigationContainer } from '@react-navigation/native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    canGoBack: () => true,
    goBack: mockGoBack,
  }),
}));

const mockAccountData = {
  fullName: 'user name',
  contactInfo: { email: 'helllo@hello.world', phoneNumber: '81476534' },
  address: 'Some Address',
};

describe('Personal Details Screen', () => {
  const renderPage = (preloadedState?: any) =>
    renderWithProviders(
      <NavigationContainer>
        <PersonalDetailsScreen />
      </NavigationContainer>,
      { preloadedState },
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Personal Details Screen and display account options upon navigation', async () => {
    const { findByTestId } = renderPage();

    const PersonalDetails = await findByTestId('personal-details-screen');
    expect(PersonalDetails).toBeTruthy();
  });

  it('should call goback and save the details to the store, if user submits all their personal details correctly', async () => {
    const { store, getByText, getByTestId } = renderWithProviders(
      <NavigationContainer>
        <PersonalDetailsScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      fireEvent.changeText(
        getByTestId('full-name-input'),
        mockAccountData.fullName,
      );
      fireEvent.changeText(
        getByTestId('email-input'),
        mockAccountData.contactInfo.email,
      );
      fireEvent.changeText(
        getByTestId('phone-number-input'),
        mockAccountData.contactInfo.phoneNumber,
      );
      fireEvent.changeText(
        getByTestId('address-input'),
        mockAccountData.address,
      );
    });

    await waitFor(() => {
      act(() => {
        fireEvent.press(getByText('Save'));
      });
      expect(mockGoBack).toHaveBeenCalled();
      expect(store.getState().accountData).toStrictEqual(mockAccountData);
    });
  });
});
