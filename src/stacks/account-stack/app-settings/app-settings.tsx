import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setTheme } from '@/store/slices/utilities-slice';
import { AppTheme, themesArray, useAppTheme } from '@/theme';

export const AppSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const { currentTheme } = useAppSelector(state => state.utils);

  const handleThemeChange = (changeTheme: 'default' | 'dark' | 'light') => {
    dispatch(setTheme(changeTheme));
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        accessibilityRole="header"
        style={styles.title}>
        Choose your preferred theme
      </Text>
      {themesArray.map(possibleTheme => (
        <View key={possibleTheme} style={styles.radioContainer}>
          <Text variant="bodyLarge">
            {possibleTheme.charAt(0).toUpperCase() + possibleTheme.slice(1)}
          </Text>
          <RadioButton
            value={possibleTheme}
            status={currentTheme === possibleTheme ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange(possibleTheme)}
          />
        </View>
      ))}
    </View>
  );
};

const makeStyles = ({ spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    title: {
      marginBottom: spacing.lg,
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
  });
