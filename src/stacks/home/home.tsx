import { Image, SafeAreaView } from 'react-native';
import React from 'react';
import ScreenInProgress from '@/components/in-progress';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenInProgress />
      <Image
        source={{
          uri: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
        }}
        height={160}
        width={160}
      />
    </SafeAreaView>
  );
};
