import React from 'react';

import { AccountStackParamList } from '@/app.interface';

import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Navbar from '@/components/navbar';
import AccountScreen from '@/stacks/account-stack/account';
import PersonalDetailsScreen from '@/stacks/account-stack/personal-details';
import CardsScreen from '@/stacks/account-stack/cards';

const AccountStack = createStackNavigator<AccountStackParamList>();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="Account"
      screenOptions={{
        header: () => (
          <View>
            <Text>Header Title</Text>
          </View>
        ),
      }}>
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          header: () => <Navbar title="My Account" mode="large" />,
        }}
        initialParams={{ initialRoute: true }}
      />
      <AccountStack.Screen
        name="PersonalDetails"
        component={CardsScreen}
        options={{
          header: () => (
            <Navbar title="Personal Details" mode="center-aligned" />
          ),
        }}
      />
      <AccountStack.Screen
        name="Cards"
        component={PersonalDetailsScreen}
        options={{
          header: () => <Navbar title="Saved Cards" mode="center-aligned" />,
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
