import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import FormError from '@/components/form-field';

import { AppTheme, cardColours, useAppTheme } from '@/theme';
import { saveCardTWalletKeychain } from '@/utils/keychain-utils';
import uuid from 'react-native-uuid';
import { validationSchema } from './validation';
import { useAppDispatch } from '@/hooks';
import { addCard } from '@/store/slices/wallet-slice';

export const AddCreditCard = ({ onCardSaved }: { onCardSaved: () => void }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const dispatch = useAppDispatch();

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
          color: cardColours[Math.floor(Math.random() * cardColours.length)],
        }),
      );
    });
  };

  const initialFormValues = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  return (
    <View>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          submitNewCard(values);
        }}>
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          handleSubmit,
          resetForm,
        }) => (
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="Card Number"
              value={values.cardNumber}
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              keyboardType="number-pad"
              maxLength={16}
              enablesReturnKeyAutomatically
              testID="card-number-input"
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
                enablesReturnKeyAutomatically
                testID="expiry-date-input"
              />
              <TextInput
                mode="outlined"
                label="CVV"
                value={values.cvv}
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                keyboardType="number-pad"
                maxLength={3}
                enablesReturnKeyAutomatically
                testID="cvv-input"
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
                mode="contained"
                onPress={() => {
                  handleSubmit();
                  onCardSaved();
                  resetForm();
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
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cardSecondaryContainer: {
      marginTop: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg,
    },
  });
