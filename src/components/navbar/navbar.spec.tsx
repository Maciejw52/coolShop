import React from 'react';
import { waitFor, fireEvent, act } from '@testing-library/react-native';
import { Navbar } from './navbar';
import { renderWithProvidersInEnv } from '@/utils/test-utils';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    canGoBack: () => true,
    goBack: mockGoBack,
  }),
  useRoute: jest.fn(() => ({
    name: 'Home',
    params: { initialRoute: false },
  })),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = (props?: any) =>
    renderWithProvidersInEnv(<Navbar {...props} />, {});

  it('should render with the provided title', () => {
    const { getByText } = renderNavbar({ title: 'Custom Title' });

    expect(getByText('Custom Title')).toBeTruthy();
  });

  it('should render the back button if not the initial route and can go back', () => {
    const { getByTestId } = renderNavbar();

    expect(getByTestId('navbar-back-button')).toBeTruthy();
  });

  it('should call navigation.goBack when back button is pressed', async () => {
    const { getByTestId } = renderNavbar();

    await waitFor(() => {
      act(() => {
        fireEvent.press(getByTestId('navbar-back-button'));
      });
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('should not render the back button if it is the initial route or cannot go back', () => {
    const spyUseRoute = jest.spyOn(
      require('@react-navigation/native'),
      'useRoute',
    );

    spyUseRoute.mockReturnValue({
      name: 'Home',
      params: { initialRoute: true },
    });

    const { queryByTestId } = renderNavbar();

    expect(queryByTestId('navbar-back-button')).toBeNull();

    spyUseRoute.mockRestore();
  });
});
