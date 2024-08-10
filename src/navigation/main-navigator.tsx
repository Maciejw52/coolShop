import React from 'react';

import { MainAppNavigatorParamList } from '@/app.interface';
import { useAppTheme } from '@/hooks';
import BasketScreen from '@/stacks/basket';
import HomeScreen from '@/stacks/home';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AccountStackScreen from './account-navigator';

const Tab = createMaterialBottomTabNavigator<MainAppNavigatorParamList>();

const MainAppNavigator = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      theme={theme}
      activeColor={theme.colors.secondary}
      inactiveColor={theme.colors.onBackground}
      activeIndicatorStyle={{ backgroundColor: theme.colors.onSecondary }}
      barStyle={{
        backgroundColor: theme.colors.elevation.level2,
        borderTopColor: theme.colors.backdrop,
        borderTopWidth: 1,
      }}
      sceneAnimationEnabled
      initialRouteName="Shop"
      backBehavior="initialRoute">
      <Tab.Screen
        name="Basket"
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: 'basket',
        }}
        component={BasketScreen}
      />
      <Tab.Screen
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: 'shopping-outline',
        }}
        component={HomeScreen}
        initialParams={{ initialRoute: true }}
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
