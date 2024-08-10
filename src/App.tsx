import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MainAppNavigator from '@/navigation/main-navigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = isDarkMode ? '#000145' : '#0099c3';

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle}
        />
        <MainAppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
