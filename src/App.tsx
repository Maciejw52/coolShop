import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainAppNavigator from '@/navigation/main-navigator';
import { CombinedDarkTheme, CombinedLightTheme } from '@/theme';
import { AppStoreProvider } from './store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  let theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;

  const barStyle = isDarkMode ? 'light-content' : 'dark-content';

  const NavigationTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.backdrop,
      text: theme.colors.onPrimary,
      border: theme.colors.surface,
      notification: theme.colors.primary,
    },
  };

  return (
    <AppStoreProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={NavigationTheme}>
          <StatusBar
            barStyle={barStyle}
            backgroundColor={theme.colors.background}
          />
          <MainAppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AppStoreProvider>
  );
};

export default App;
