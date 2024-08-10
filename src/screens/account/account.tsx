import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AccountScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(21, 21, 21)',
  },
});
