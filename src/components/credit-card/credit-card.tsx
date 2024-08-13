import React, { useMemo, useRef } from 'react';

import { AppTheme, useAppTheme } from '@/theme';
import {
  getCardFromWalletKeychain,
  removeCardFromWalletKeychain,
} from '@/utils/keychain-utils';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Icon, Text } from 'react-native-paper';
import { RightSwipeActionCard } from '../right-swipe-action';
import { useAppDispatch } from '@/hooks';
import { removeCard } from '@/store/slices/wallet-slice';

interface CreditCardProps {
  card: {
    cardId: string;
    cardNumber: string;
    color?: string;
  };
}

export const CreditCard = ({ card }: CreditCardProps) => {
  const { cardId, cardNumber, color } = card;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const dispatch = useAppDispatch();

  const handleRevealDetails = async () => {
    const temp = await getCardFromWalletKeychain(cardId);
    console.log(temp);
  };

  const handleRemoveCard = async () => {
    await removeCardFromWalletKeychain(cardId).then(() => {
      dispatch(removeCard(cardId));
    });
  };

  const swipeableRow = useRef<SwipeableMethods>(null);

  return (
    <Swipeable
      ref={swipeableRow}
      renderRightActions={() => (
        <RightSwipeActionCard
          onPressSeeMore={function (): void {
            throw new Error('Function not implemented.');
          }}
          onPressDelete={handleRemoveCard}
        />
      )}
      friction={2}
      overshootLeft={false}
      rightThreshold={25}>
      <TouchableOpacity
        testID={`credit-card-${cardNumber}`}
        activeOpacity={1}
        onPress={handleRevealDetails}
        style={[styles.cardContainer, { backgroundColor: color }]}>
        <View style={styles.cardSpacing}>
          <Text style={styles.cardTitle}>COOL CREDIT :)</Text>
          <Icon
            size={23}
            color={theme.colors.white}
            source={'contactless-payment'}
          />
        </View>
        <View>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
        </View>
        <View style={styles.cardSpacing}>
          <Text style={styles.cardExpiry}>{'**/**'}</Text>
          <Text style={styles.cardCvv}>CVV: {'***'}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const makeStyles = ({ spacing, fontSize, colors }: AppTheme) =>
  StyleSheet.create({
    cardContainer: {
      width: 310,
      height: 180,
      padding: spacing.md,
      justifyContent: 'space-between',
      borderRadius: 10,
      elevation: 5,
    },
    cardTitle: {
      fontWeight: 'bold',
      color: colors.white,
    },
    cardNumber: {
      fontSize: fontSize.lg,
      fontWeight: 'bold',
      letterSpacing: 3,
      color: colors.white,
    },
    cardExpiry: {
      fontSize: fontSize.md,
      color: colors.white,
    },
    cardSpacing: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardCvv: {
      fontSize: fontSize.sm,
      fontWeight: 'bold',
      color: colors.white,
    },
  });
