import React from 'react';
import { HomeScreen } from './home';
import { renderWithProvidersInEnv } from '@/utils/test-utils';

describe('Home', () => {
  it('should have the screen in progress page', () => {
    const { getByLabelText } = renderWithProvidersInEnv(<HomeScreen />);
    expect(getByLabelText('Cool Store Banner')).toBeTruthy();
  });
});
