import React, { useMemo, useState } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { AppTheme, useAppTheme } from '@/theme';
import { useAppDispatch } from '@/hooks';
import { addItemToBasket } from '@/store/slices/basket-slice';
import { Product } from '@/app.interface';

interface ShopItemProps {
  item: Product;
}

export const ShopItem = ({ item }: ShopItemProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const handlePressHeart = () => {
    setIsLiked(prevState => !prevState);
  };

  const handleAddToBasket = () => {
    dispatch(
      addItemToBasket({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
      }),
    );
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.titleHeart}>
            <View style={styles.details}>
              <Text numberOfLines={3} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <Pressable onPress={handlePressHeart}>
              <Icon
                source={isLiked ? 'cards-heart' : 'cards-heart-outline'}
                size={24}
                color={isLiked ? theme.colors.themeBlue : ''}
              />
            </Pressable>
          </View>
          <View style={styles.priceBuyContainer}>
            <Text style={styles.price}>£{item.price.toFixed(2)}</Text>
            <Button
              mode="elevated"
              onPress={handleAddToBasket}
              textColor={theme.colors.themeBlue}
              contentStyle={styles.buyButtonStyles}
              icon="basket-plus">
              Buy Now
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

const makeStyles = ({ spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: spacing.sm,
    },
    details: {
      flex: 1,
      marginRight: spacing.sm,
    },
    title: {
      fontSize: fontSize.md,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    price: {
      fontSize: fontSize.lg,
      color: 'green',
      fontWeight: '600',
    },
    priceBuyContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buyButtonStyles: {
      flexDirection: 'row-reverse',
    },
    titleHeart: {
      flex: 1,
      flexDirection: 'row',
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'column',
    },
  });
