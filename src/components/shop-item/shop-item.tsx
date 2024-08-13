import React, { useMemo, useState } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { AppTheme, useAppTheme } from '@/theme';

export const ShopItem = ({ item }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
    setIsLiked(prevState => !prevState);
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.titleHeart}>
            <View style={styles.details}>
              <Text numberOfLines={3} style={styles.title}>
                {item.title}
              </Text>
            </View>
            <Pressable onPress={handlePress}>
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
              textColor={theme.colors.themeBlue}
              contentStyle={styles.buyButtonStyles}
              icon={'basket-plus'}>
              Buy Now
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

const makeStyles = ({ colors, spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.onBackground,
      paddingBottom: 10,
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
      fontSize: 20,
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
      flexDirection: 'row',
      flex: 1,
    },
    contentContainer: {
      flexDirection: 'column',
      flex: 1,
    },
  });
