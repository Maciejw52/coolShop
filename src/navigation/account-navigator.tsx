import React from 'react';

import { AccountStackParamList } from '@/app.interface';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '@/components/navbar';
import AccountScreen from '@/stacks/account-stack/account';
import PersonalDetailsScreen from '@/stacks/account-stack/personal-details';
import WalletScreen from '@/stacks/account-stack/wallet';

const AccountStack = createStackNavigator<AccountStackParamList>();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'My Account',
          header: () => <Navbar title="My Account" mode="large" />,
        }}
        initialParams={{ initialRoute: true }}
      />
      <AccountStack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{
          title: 'Personal Details',
          header: () => (
            <Navbar title="Personal Details" mode="center-aligned" />
          ),
        }}
      />
      <AccountStack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          header: () => <Navbar title="Wallet" mode="center-aligned" />,
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
