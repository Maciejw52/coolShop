import React from 'react';
import { render } from '@testing-library/react-native';
import { BasketScreen } from './basket';
import { PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme } from '@/theme';

describe('Home', () => {
  it('should have the screen in progress page', () => {
    const { getByText } = render(
      <PaperProvider theme={CombinedDarkTheme}>
        <BasketScreen />
      </PaperProvider>,
    );
    expect(getByText('Screen In Progress')).toBeTruthy();
  });
});
