import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme';
import { Icon } from 'react-native-paper';

export const ScreenInProgress = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Icon source="hammer-wrench" size={120} color={theme.colors.primary} />
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
