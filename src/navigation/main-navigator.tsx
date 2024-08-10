import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import HomeScreen from '../screens/home';
import BasketScreen from '../screens/basket';
import AccountScreen from '../screens/account';
import { MainAppNavigatorParamList } from '../app.interface';

const Tab = createMaterialBottomTabNavigator<MainAppNavigatorParamList>();

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
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
        name="Account"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: 'account-circle',
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;
