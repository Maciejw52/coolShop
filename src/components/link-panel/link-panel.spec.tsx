import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LinkPanel } from './link-panel';
import { CombinedLightTheme } from '@/theme';

const mockOnPress = jest.fn();
const mockTitle = 'Mock Title';

describe('LinkPanel Component', () => {
  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders with the correct title and icons', () => {
    const { getByText } = render(
      <LinkPanel title={mockTitle} icon="folder" onPress={mockOnPress} />,
    );

    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('calls the onPress function when pressed', () => {
    const { getByText } = render(
      <LinkPanel title={mockTitle} icon="folder" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText(mockTitle));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('displays "Action Required" when showActionRequired is true', () => {
    const { getByText } = render(
      <LinkPanel
        title={mockTitle}
        icon="folder"
        showActionRequired
        onPress={mockOnPress}
      />,
    );

    expect(getByText('Action Required')).toBeTruthy();
  });

  it('does not display "Action Required" when showActionRequired is false', () => {
    const { queryByText } = render(
      <LinkPanel title={mockTitle} icon="folder" onPress={mockOnPress} />,
    );
    expect(queryByText('Action Required')).toBeNull();
  });

  it('applies error styles when status is "error"', () => {
    const { getByTestId, getByText } = render(
      <LinkPanel
        title={mockTitle}
        icon="folder"
        status="error"
        onPress={mockOnPress}
      />,
    );

    const listItemTitle = getByText(mockTitle);
    const listItem = getByTestId(`link-panel-${mockTitle}`);
    expect(listItemTitle).toHaveStyle({
      color: 'rgba(49, 48, 51, 1)',
    });
    expect(listItem).toHaveStyle({
      backgroundColor: 'rgba(249, 222, 220, 1)',
    });
  });

  it('does not apply error styles when status is "default"', () => {
    const { getByTestId } = render(
      <LinkPanel
        title={mockTitle}
        icon="folder"
        status="default"
        onPress={mockOnPress}
      />,
    );
    const listItem = getByTestId(`link-panel-${mockTitle}`);

    expect(listItem).toHaveStyle({
      backgroundColor: 'rgba(244, 239, 244, 1)',
    });
  });
});
