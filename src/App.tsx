import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';

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
        <SafeAreaView style={{ backgroundColor: backgroundStyle }}>
          <View>
            <Text>React Native</Text>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
