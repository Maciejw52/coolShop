import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import FormError from '@/components/form-field';

import { AppTheme, useAppTheme } from '@/theme';
import { saveCardTWalletKeychain } from '@/utils/keychain-utils';
import uuid from 'react-native-uuid';
import { validationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addCard } from '@/store/slices/wallet-slice';

export const AddCreditCard = ({ onCardSaved }: { onCardSaved: () => void }) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const dispatch = useAppDispatch();

  const colorOptions = [
    theme.colors.primaryContainer,
    theme.colors.secondaryContainer,
    theme.colors.tertiaryContainer,
  ];

  const submitNewCard = async (values: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => {
    const generatedId = uuid.v4().toString();
    await saveCardTWalletKeychain({
      ...{ cardId: generatedId },
      ...values,
    } as never).then(() => {
      dispatch(
        addCard({
          cardId: generatedId,
          cardNumber: `****  ${values.cardNumber.slice(-4)}`,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        }),
      );
      onCardSaved();
    });
  };

  return (
    <View>
      <Formik
        initialValues={{
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          submitNewCard(values);
        }}>
        {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="Card Number"
              value={values.cardNumber}
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              keyboardType="number-pad"
              maxLength={16}
            />
            <View style={styles.cardSecondaryContainer}>
              <TextInput
                mode="outlined"
                label="MM/YY"
                value={values.expiryDate}
                onChangeText={handleChange('expiryDate')}
                onBlur={handleBlur('expiryDate')}
                keyboardType="number-pad"
                maxLength={5}
              />
              <TextInput
                mode="outlined"
                label="CVV"
                value={values.cvv}
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
            <FormError name="cardNumber" />
            <FormError name="expiryDate" />
            <FormError name="cvv" />
            <View style={styles.submitContainer}>
              <Button
                disabled={
                  !!errors.cardNumber || !!errors.cvv || !!errors.expiryDate
                }
                mode="contained-tonal"
                onPress={() => {
                  handleSubmit();
                }}>
                Save Card
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const makeStyles = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
    },
    title: {
      fontSize: spacing.lg,
      marginBottom: spacing.lg,
    },
    form: {
      marginBottom: spacing.lg,
    },
    submitContainer: {
      gap: spacing.xs,
      paddingVertical: spacing.md,
    },
    cardSecondaryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
  });
