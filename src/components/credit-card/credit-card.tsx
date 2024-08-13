import React, { useMemo, useRef, useState } from 'react';

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

  const [revealDetails, setRevealDetails] = useState<{
    cardNumber?: string;
    cvv?: string;
    expiryDate?: string;
  } | null>(null);

  const handleRevealDetails = async () => {
    try {
      const details = await getCardFromWalletKeychain(cardId);
      setRevealDetails(details);
    } catch (error) {
      console.log('Failed to get card details:', error);
    }
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
          onPressSeeMore={handleRevealDetails}
          onPressDelete={handleRemoveCard}
          testID={cardNumber}
        />
      )}
      friction={2}
      overshootLeft={false}
      rightThreshold={25}>
      <TouchableOpacity
        testID={`credit-card-${cardNumber}`}
        activeOpacity={1}
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
          <Text style={styles.cardNumber}>
            {revealDetails?.cardNumber?.replace(/(.{4})/g, '$1 ').trim() ||
              cardNumber}
          </Text>
        </View>
        <View style={styles.cardSpacing}>
          <Text style={styles.cardExpiry}>
            {revealDetails?.expiryDate || '**/**'}
          </Text>
          <Text style={styles.cardCvv}>
            {revealDetails?.cvv ? `CVV: ${revealDetails.cvv}` : 'CVV: ***'}
          </Text>
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
      letterSpacing: 1.5,
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
