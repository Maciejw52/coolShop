import React from 'react';

import { AccountStackParamList } from '@/app.interface';
import AccountScreen from '@/screens/account';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

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
        initialParams={{ initialRoute: true }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
