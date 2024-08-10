import React from 'react';

import BasketScreen from '@/screens/basket';
import HomeScreen from '@/screens/home';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MainAppNavigatorParamList } from '@/app.interface';
import AccountStackScreen from './account-navigator';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator<MainAppNavigatorParamList>();

const MainAppNavigator = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'light' ? MD3LightTheme : MD3DarkTheme;

  return (
    <Tab.Navigator
      theme={theme}
      sceneAnimationEnabled
      initialRouteName="Shop"
      backBehavior="initialRoute">
      <Tab.Screen
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: 'home',
        }}
        component={HomeScreen}
        initialParams={{ initialRoute: true }}
      />
      <Tab.Screen
        name="Basket"
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: 'basket',
        }}
        component={BasketScreen}
      />
      <Tab.Screen
        name="AccountStack"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: 'account-circle',
        }}
        component={AccountStackScreen}
      />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;
