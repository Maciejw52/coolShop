import React from 'react';

import { useAppTheme } from '@/theme';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { MainAppNavigatorParamList } from '@/app.interface';

interface NavbarProps {
  title?: string;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
}

export const Navbar = ({ title, mode }: NavbarProps) => {
  const theme = useAppTheme();
  const route = useRoute();

  const navigation = useNavigation<NavigationProp<MainAppNavigatorParamList>>();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const isInitialRoute =
    (route.params &&
      'initialRoute' in route.params &&
      route.params.initialRoute) ||
    false;

  return (
    <Appbar.Header mode={mode || 'small'} theme={theme}>
      {!isInitialRoute && navigation.canGoBack() && (
        <Appbar.BackAction
          testID="navbar-back-button"
          onPress={handleBackButtonPress}
        />
      )}
      <Appbar.Content title={title || route.name} />
    </Appbar.Header>
  );
};
