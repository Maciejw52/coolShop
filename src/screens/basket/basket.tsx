import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const BasketScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>BasketScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
