import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { List } from 'react-native-paper';
import accountOptions from './account-options.json';
import { AppTheme } from '@/theme';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { AccountStackParamList } from '@/app.interface';

type AccountScreenProps = NativeStackScreenProps<
  AccountStackParamList,
  'Account'
>;

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {accountOptions.accountActions.map((optionSection, index) => (
        <List.Section key={index}>
          {optionSection.map(option => (
            <List.Item
              key={option.title}
              title={option.title}
              left={props => <List.Icon {...props} icon={option.icon} />}
              onPress={() => navigation.navigate(option.screen)}
              style={styles.listItem}
            />
          ))}
        </List.Section>
      ))}
    </SafeAreaView>
  );
};

const makeStyles = ({ colors, spacing, fontSize }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: spacing.md,
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: fontSize.md,
      color: colors.text,
      textAlign: 'center',
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listItem: {
    borderRadius: 8,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

// Personal Details CTA to new screen for inputting personal details

// Card Details CTA to a new screen full of

// Settings to configure if the theme should follow system or always light or always dark
