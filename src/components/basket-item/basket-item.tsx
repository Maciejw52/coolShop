import { BasketItem } from '@/app.interface';
import { AppTheme, useAppTheme } from '@/theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface BasketItemProps {
  item: BasketItem;
  onRemove: () => void;
}

export const BasketItemCompoenent = ({ item, onRemove }: BasketItemProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>Price: ${item.price.toFixed(2)}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
      <Button textColor={theme.colors.error} onPress={onRemove}>
        Remove
      </Button>
    </View>
  );
};

const makeStyles = ({ colors, spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    title: {
      fontSize: fontSize.md,
      fontWeight: 'bold',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.onBackground,
    },
    details: {
      flex: 1,
      marginRight: spacing.md,
    },
  });
