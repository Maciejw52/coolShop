import React from 'react';

import { useAppTheme } from '@/hooks';
import { useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

interface NavbarProps {
  title?: string;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
}

export const Navbar = ({ title, mode }: NavbarProps) => {
  const theme = useAppTheme();
  const route = useRoute();

  return (
    <Appbar.Header mode={mode || 'small'} theme={theme}>
      <Appbar.Content title={title || route.name} />
    </Appbar.Header>
  );
};
