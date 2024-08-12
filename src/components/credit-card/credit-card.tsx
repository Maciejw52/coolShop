import { AppTheme, useAppTheme } from '@/theme';
import { getCardFromWalletKeychain } from '@/utils/keychain-utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Text } from 'react-native-paper';

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
  const styles = makeStyles(theme);

  const handleRevealDetails = async () => {
    const temp = await getCardFromWalletKeychain(cardId);
    console.log(temp);
  };

  return (
    <TouchableOpacity
      testID={`credit-card-${cardNumber}`}
      activeOpacity={0.8}
      onPress={handleRevealDetails}
      style={[styles.cardContainer, { backgroundColor: color }]}>
      <View style={styles.cardSpacing}>
        <Text style={styles.cardTitle}>COOL CREDIT :)</Text>
        <Icon size={23} source={'contactless-payment'} />
      </View>
      <View>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
      </View>
      <View style={styles.cardSpacing}>
        <Text style={styles.cardExpiry}>{'**/**'}</Text>
        <Text style={styles.cardCvv}>CVV: {'***'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = ({ spacing, fontSize }: AppTheme) =>
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
    },
    cardNumber: {
      fontSize: fontSize.lg,
      fontWeight: 'bold',
      letterSpacing: 3,
    },
    cardExpiry: {
      fontSize: fontSize.md,
    },
    cardSpacing: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardCvv: {
      fontSize: fontSize.sm,
      fontWeight: 'bold',
    },
  });
