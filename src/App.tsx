import React from 'react';

import MainAppNavigator from '@/navigation/main-navigator';
import { CombinedDarkTheme, CombinedLightTheme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { RootStackParamList } from './app.interface';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={NavigationTheme}>
              <StatusBar
                barStyle={barStyle}
                backgroundColor={theme.colors.background}
              />
              <MainAppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
