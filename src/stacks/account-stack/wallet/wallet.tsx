import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AddCreditCard } from '@/components/add-credit-card';
import { useAppSelector } from '@/hooks';
import { AppTheme, useAppTheme } from '@/theme';
import { CreditCard } from '@/components/credit-card';
import { ScrollView } from 'react-native-gesture-handler';

export const WalletScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { noOfCards, secureWallet } = useAppSelector(state => state.wallet);
  const MAX_NO_OF_CARDS = 4;

  const [showForm, setShowForm] = useState(noOfCards === 0);

  const handleAddPress = () => setShowForm(true);
  const handleCardSaved = () => setShowForm(false);

  const renderAddButton = noOfCards < MAX_NO_OF_CARDS && !showForm;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Cards</Text>
        {renderAddButton && (
          <Button
            mode="text"
            onPress={handleAddPress}
            labelStyle={styles.addButton}>
            + Add
          </Button>
        )}
      </View>
      {(noOfCards === 0 || showForm) && (
        <AddCreditCard onCardSaved={handleCardSaved} />
      )}
      {!showForm && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardContainer}>
          {secureWallet.map(card => (
            <CreditCard key={card.cardId} card={card} />
          ))}
        </ScrollView>
      )}
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
