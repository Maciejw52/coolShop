import React from 'react';

import { MainAppNavigatorParamList } from '@/app.interface';
import { AppTheme, useAppTheme } from '@/theme';
import BasketScreen from '@/stacks/basket';
import HomeScreen from '@/stacks/home';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AccountStackScreen from './account-navigator';
import { StyleSheet } from 'react-native';

const Tab = createMaterialBottomTabNavigator<MainAppNavigatorParamList>();

const MainAppNavigator = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <Tab.Navigator
      theme={theme}
      activeColor={theme.colors.secondary}
      inactiveColor={theme.colors.onBackground}
      activeIndicatorStyle={{ backgroundColor: theme.colors.onSecondary }}
      barStyle={styles.tabBar}
      sceneAnimationEnabled
      initialRouteName="Shop"
      backBehavior="initialRoute">
      <Tab.Screen
        name="Basket"
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: 'basket',
          tabBarButtonTestID: 'basket-tab-bar-button',
        }}
        component={BasketScreen}
      />
      <Tab.Screen
        name="Shop"
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: 'shopping-outline',
          tabBarButtonTestID: 'shop-tab-bar-button',
        }}
        component={HomeScreen}
        initialParams={{ initialRoute: true }}
      />
      <Tab.Screen
        name="AccountStack"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: 'account-circle',
          tabBarButtonTestID: 'account-tab-bar-button',
        }}
        component={AccountStackScreen}
      />
    </Tab.Navigator>
  );
};

const makeStyles = ({ colors }: AppTheme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.elevation.level2,
      borderTopColor: colors.backdrop,
      borderTopWidth: 1,
    },
  });

export default MainAppNavigator;
