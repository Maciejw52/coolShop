import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ErrorMessage } from 'formik';
import { AppTheme, useAppTheme } from '@/theme';

interface FormErrorProps {
  name: string;
}

export const FormError = ({ name }: FormErrorProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <ErrorMessage name={name}>
      {(errorMessage: string) => (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </ErrorMessage>
  );
};

const makeStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    errorText: {
      color: colors.error,
      marginTop: spacing.xxs,
    },
  });
