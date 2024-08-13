import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import {
  clearBasket,
  removeItemFromBasket,
  selectBasketTotal,
} from '@/store/slices/basket-slice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { BasketState } from '@/app.interface';
import { AppTheme, useAppTheme } from '@/theme';
import BasketItemCompoenent from '@/components/basket-item';

export const BasketScreen = () => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const dispatch = useAppDispatch();
  const items = useAppSelector(
    (state: { basket: BasketState }) => state.basket.items,
  );
  const total = useAppSelector(selectBasketTotal);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromBasket(id));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>Your basket is empty</Text>
            <Text>Do Some Cool Shopping NOW!</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <BasketItemCompoenent
                  item={item}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              )}
            />
            <View style={styles.footer}>
              <Text style={styles.total}>Total: £{total.toFixed(2)}</Text>
              <Button onPress={handleClearBasket}>Clear Basket</Button>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const makeStyles = ({ colors, spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.lg,
    },
    footer: {
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.onBackground,
      alignItems: 'center',
    },
    total: {
      fontSize: fontSize.md,
      fontWeight: 'bold',
    },
  });
