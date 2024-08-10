import { SafeAreaView } from 'react-native';
import React from 'react';
import ScreenInProgress from '@/components/in-progress';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenInProgress />
    </SafeAreaView>
  );
};
