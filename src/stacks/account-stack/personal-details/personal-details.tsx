import React from 'react';

import { PersonalDetailsScreenProps } from '@/app.interface';
import FormError from '@/components/form-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateAccount } from '@/store/slices/account-data-slice';
import { AppTheme, useAppTheme } from '@/theme';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { FormValues } from './types';
import { validationSchema } from './validation';

export const PersonalDetailsScreen = ({
  navigation,
}: PersonalDetailsScreenProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const dispatch = useAppDispatch();
  const accountData = useAppSelector(state => state.accountData);

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
    <View style={styles.pageContainer}>
      <Text>
        We need the following details so that you can receive your order with no
        fuss.
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
