import React from 'react';

import { MainAppNavigatorParamList } from '@/app.interface';
import HomeScreen from '@/stacks/home';
import { AppTheme, useAppTheme } from '@/theme';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AccountStackScreen from './account-navigator';
import BasketStackScreen from './basket-navigator';

const Tab = createMaterialBottomTabNavigator<MainAppNavigatorParamList>();

const MainAppNavigator = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <Tab.Navigator
      theme={theme}
      activeColor={theme.colors.themeBlue}
      inactiveColor={theme.colors.onBackground}
      activeIndicatorStyle={{ backgroundColor: theme.colors.surface }}
      barStyle={styles.tabBar}
      sceneAnimationEnabled
      initialRouteName="Shop"
      backBehavior="initialRoute">
      <Tab.Screen
        name="BasketStack"
        options={{
          tabBarLabel: 'Basket',
          tabBarIcon: 'basket',
          tabBarButtonTestID: 'basket-tab-bar-button',
        }}
        component={BasketStackScreen}
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
