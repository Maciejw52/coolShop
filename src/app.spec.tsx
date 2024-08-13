import React from 'react';
import { renderWithProviders } from '@/utils/test-utils';
import { waitFor } from '@testing-library/react-native';
import App from './app';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const renderPage = (preloadedState?: any) =>
  renderWithProviders(<App />, { preloadedState });

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('should render the home screen first', async () => {
    const { getByTestId } = renderPage();

    await waitFor(() => {
      expect(getByTestId('shop-tab-bar-button')).toBeTruthy();
    });
  });
});
