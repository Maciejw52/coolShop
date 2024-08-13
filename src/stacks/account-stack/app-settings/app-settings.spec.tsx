import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { AppSettingsScreen } from './app-settings';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Wallet Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPage = (preloadedState?: any) =>
    renderWithProviders(
      <NavigationContainer>
        <AppSettingsScreen />
      </NavigationContainer>,
      { preloadedState },
    );
});
