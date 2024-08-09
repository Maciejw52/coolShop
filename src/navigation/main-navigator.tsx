import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { useColorScheme } from 'react-native';
import HomeScreen from '../screens/home';
import BasketScreen from '../screens/basket';

const Tab = createMaterialBottomTabNavigator();

const MainAppNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      sceneAnimationEnabled
      initialRouteName="WorkoutStack"
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
    </Tab.Navigator>
  );
};

export default MainAppNavigator;
