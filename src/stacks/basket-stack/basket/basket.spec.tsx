import React from 'react';
import { BasketScreen } from './basket';
import { renderWithProvidersInEnv } from '@/utils/test-utils';

describe('Basket', () => {
  it('should render the basket screen initially with it empty', () => {
    const { getByText } = renderWithProvidersInEnv(<BasketScreen />);
    expect(getByText('Your basket is empty')).toBeTruthy();
    expect(getByText('Do Some Cool Shopping NOW!')).toBeTruthy();
  });
});
