import React, { useMemo } from 'react';

import FormError from '@/components/form-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateAccount } from '@/store/slices/account-data-slice';
import { AppTheme, useAppTheme } from '@/theme';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { FormValues } from './types';
import { validationSchema } from './validation';
import { useNavigation } from '@react-navigation/native';

export const PersonalDetailsScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const dispatch = useAppDispatch();
  const accountData = useAppSelector(state => state.accountData);

  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const isFormDetailsUnchanged = (values: FormValues) => {
    return (
      values.fullName !== accountData.fullName ||
      values.email !== accountData.contactInfo?.email ||
      values.phoneNumber !== accountData.contactInfo?.phoneNumber ||
      values.address !== accountData.address
    );
  };

  return (
    <View testID="personal-details-screen" style={styles.pageContainer}>
      <Text>
        We need the following details so we know where to send your order.
      </Text>
      <Formik
        initialValues={{
          fullName: accountData.fullName,
          email: accountData.contactInfo?.email,
          phoneNumber: accountData.contactInfo?.phoneNumber,
          address: accountData.address,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          dispatch(
            updateAccount({
              fullName: values.fullName,
              contactInfo: {
                email: values.email,
                phoneNumber: values.phoneNumber,
              },
              address: values.address,
            }),
          );
        }}>
        {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  mode="outlined"
                  label="Full Name"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  enablesReturnKeyAutomatically
                  testID="full-name-input"
                />
                <FormError name="fullName" />
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                  testID="email-input"
                />
                <FormError name="email" />
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  keyboardType="phone-pad"
                  enablesReturnKeyAutomatically
                  testID="phone-number-input"
                />
                <FormError name="phoneNumber" />
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  multiline
                  enablesReturnKeyAutomatically
                  numberOfLines={4}
                  testID="address-input"
                />
                <FormError name="address" />
              </View>
            </View>
            <View style={styles.submitContainer}>
              <Button
                disabled={
                  !isFormDetailsUnchanged(values) ||
                  !!errors.fullName ||
                  !!errors.email ||
                  !!errors.phoneNumber ||
                  !!errors.address
                }
                mode="contained-tonal"
                onPress={() => {
                  handleSubmit();
                  navigateBack();
                }}>
                Save
              </Button>
              <Button mode="outlined" onPress={navigateBack}>
                Discard
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
    pageContainer: {
      flex: 1,
      paddingTop: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    container: {
      flex: 1,
      paddingTop: spacing.md,
      justifyContent: 'space-between',
    },
    inputContainer: { gap: spacing.sm },
    submitContainer: {
      gap: spacing.xs,
      paddingVertical: spacing.md,
    },
  });
