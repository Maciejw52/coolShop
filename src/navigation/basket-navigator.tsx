import React from 'react';
import { BasketStackParamList } from '@/app.interface';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '@/components/navbar';
import BasketScreen from '@/stacks/basket-stack/basket';

const BasketStack = createStackNavigator<BasketStackParamList>();

const BasketStackScreen = () => {
  return (
    <BasketStack.Navigator initialRouteName="Basket">
      <BasketStack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          title: 'Basket',
          header: () => <Navbar title="Basket" mode="center-aligned" />,
        }}
      />
    </BasketStack.Navigator>
  );
};

export default BasketStackScreen;
