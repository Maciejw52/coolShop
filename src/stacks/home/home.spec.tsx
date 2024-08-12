import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from './home';
import { PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme } from '@/theme';

describe('Home', () => {
  it('should have the screen in progress page', () => {
    const { getByText } = render(
      <PaperProvider theme={CombinedDarkTheme}>
        <HomeScreen />
      </PaperProvider>,
    );
    expect(getByText('Screen In Progress')).toBeTruthy();
  });
});
