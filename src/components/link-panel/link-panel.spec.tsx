import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useAppTheme } from '@/hooks';
import { LinkPanel } from './link-panel';

jest.mock('@/hooks');

describe('LinkPanel Component', () => {
  const mockOnPress = jest.fn();
  const mockTheme = {
    colors: {
      inversePrimary: '#fff',
    },
    spacing: {},
    fontSize: {},
  };

  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue(mockTheme);
    mockOnPress.mockClear();
  });

  it('renders with the correct title and icons', () => {
    const { getByText } = render(
      <LinkPanel title="Test Title" icon="folder" onPress={mockOnPress} />,
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls the onPress function when pressed', () => {
    const { getByText } = render(
      <LinkPanel title="Test Title" icon="folder" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Test Title'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
