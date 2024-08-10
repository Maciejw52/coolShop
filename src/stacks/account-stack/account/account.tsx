import React, { useCallback } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { AccountStackParamList } from '@/app.interface';
import { LinkPanel } from '@/components/link-panel/link-panel';
import { useAppTheme } from '@/hooks';
import { AppTheme } from '@/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { AccountOption } from './types';
import { accountOptionsData } from './account-options';

type AccountScreenProps = StackScreenProps<AccountStackParamList, 'Account'>;

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const handleCTAction = useCallback(
    (option: AccountOption) => {
      const { type, destination } = option.action;
      if (type === 'navigate') {
        try {
          navigation.navigate(destination as any);
        } catch {
          Alert.alert('Could Not navigate to this');
        }
      } else {
        // perform state change to ask user that they definitely want to delete the app data
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      {accountOptionsData.map((optionSection, index) => (
        <List.Section key={index} style={styles.section}>
          {optionSection.map(option => (
            <LinkPanel
              key={option.title}
              title={option.title}
              icon={option.icon}
              onPress={() => handleCTAction(option)}
            />
          ))}
        </List.Section>
      ))}
    </SafeAreaView>
  );
};

const makeStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing.md,
    },
    section: {
      borderWidth: 1,
      borderRadius: spacing.sm,
      borderColor: colors.background,
      gap: spacing.xxs,
      overflow: 'hidden',
    },
  });
