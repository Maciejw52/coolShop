import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/imports';

export const ScreenInProgress = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="hammer-wrench"
        size={120}
        color="rgb(255, 255, 255)"
        style={styles.icon}
      />
      <Text style={styles.title}>Screen In Progress</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring this screen to you soon!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(223, 223, 223)',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgb(170, 170, 170)',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default ScreenInProgress;
