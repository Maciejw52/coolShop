import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AddCreditCard } from '@/components/add-credit-card';
import { useAppSelector } from '@/hooks';
import { AppTheme, useAppTheme } from '@/theme';
import { CreditCard } from '@/components/credit-card';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const WalletScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { noOfCards, secureWallet } = useAppSelector(state => state.wallet);
  const MAX_NO_OF_CARDS = 6;

  const [showForm, setShowForm] = useState(false);
  console.log(noOfCards);
  // Cool Animation :)
  const offsetY = useSharedValue(0);
  const formOpacity = useSharedValue(0);
  const formTranslateX = useSharedValue(500);

  const handleAddPress = () => {
    setShowForm(true);
    offsetY.value = withTiming(200, { duration: 300 });
    formOpacity.value = withTiming(1, { duration: 500 });
    formTranslateX.value = withTiming(0, { duration: 500 });
  };

  const handleCardSaved = () => {
    setShowForm(false);
    offsetY.value = withTiming(0, { duration: 300 });
    formOpacity.value = withTiming(0, { duration: 300 });
    formTranslateX.value = withTiming(200, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value - 220 }],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
      transform: [{ translateX: formTranslateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Cards</Text>
        {noOfCards < MAX_NO_OF_CARDS && (
          <Button
            mode="text"
            onPress={showForm ? handleCardSaved : handleAddPress}
            labelStyle={styles.addButton}>
            {showForm ? 'Discard' : '+ Add'}
          </Button>
        )}
      </View>
      <Animated.View style={[formAnimatedStyle]}>
        <AddCreditCard onCardSaved={handleCardSaved} />
      </Animated.View>
      <Animated.View style={[animatedStyle]}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardContainer}>
          {[...secureWallet].reverse().map(card => (
            <CreditCard key={card.cardId} card={card} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

const makeStyles = ({ spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: fontSize.lg,
    },
    addButton: {
      fontSize: fontSize.md,
    },
    cardContainer: {
      alignItems: 'center',
      gap: spacing.sm,
      paddingBottom: spacing.lg,
    },
  });
