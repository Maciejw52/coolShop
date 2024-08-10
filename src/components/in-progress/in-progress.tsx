import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/imports';
import { useAppTheme } from '@/hooks';
import { AppTheme } from '@/theme';

export const ScreenInProgress = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Icon
        name="hammer-wrench"
        size={120}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>Screen In Progress</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring this screen to you soon!
      </Text>
    </View>
  );
};

const makeStyles = ({ colors, spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: spacing.md,
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: fontSize.md,
      color: colors.text,
      textAlign: 'center',
    },
  });

export default ScreenInProgress;
