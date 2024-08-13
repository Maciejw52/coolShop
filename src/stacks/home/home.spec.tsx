import React from 'react';
import { HomeScreen } from './home';
import { PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme } from '@/theme';
import { renderWithProvidersInEnv } from '@/utils/test-utils';

describe('Home', () => {
  it('should have the screen in progress page', () => {
    const { getByText } = renderWithProvidersInEnv(
      <PaperProvider theme={CombinedDarkTheme}>
        <HomeScreen />
      </PaperProvider>,
    );
    expect(getByText('Screen In Progress')).toBeTruthy();
  });
});
