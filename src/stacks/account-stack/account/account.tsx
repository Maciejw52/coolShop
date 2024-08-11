import React, { useCallback } from 'react';

import { AccountScreenProps } from '@/app.interface';
import LinkPanel from '@/components/link-panel';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAccountData } from '@/store/slices/account-data-slice';
import { AppTheme, useAppTheme } from '@/theme';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { List, Snackbar, Text } from 'react-native-paper';
import { accountOptionsData } from './account-options';
import { AccountOption } from './types';

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const disaptch = useAppDispatch();
  const { fullName, address } = useAppSelector(state => state.accountData);

  // Temporary place to house snackbar
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleCTAction = useCallback(
    (option: AccountOption) => {
      const { type, destination } = option.action;
      if (type === 'navigate') {
        navigation.navigate(destination as never);
      } else if (type === 'state-change') {
        disaptch(clearAccountData());
        onToggleSnackBar();
      }
    },
    [navigation],
  );

  return (
    <>
      <SafeAreaView testID="account-screen" style={styles.container}>
        <View>
          <Text testID="account-screen-sections-title">Account Options</Text>
          {accountOptionsData.map((optionSection, index) => (
            <List.Section
              key={index}
              style={styles.section}
              testID={`account-options-section-${index}`}>
              {optionSection.map(option => {
                return (
                  <LinkPanel
                    key={option.title}
                    title={option.title}
                    icon={option.icon}
                    status={option?.status}
                    showActionRequired={
                      option.title === 'Manage personal details' &&
                      (!fullName || !address)
                    }
                    onPress={() => handleCTAction(option)}
                    testID={`account-option-${option.title}`}
                  />
                );
              })}
            </List.Section>
          ))}
        </View>
        <View>
          <Text style={styles.appVersion}>v0.0.1</Text>
        </View>
      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        testID="account-snackbar"
        action={{
          label: 'Hide',
          onPress: onDismissSnackBar,
        }}>
        App data deleted.
      </Snackbar>
    </>
  );
};

const makeStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      justifyContent: 'space-between',
    },
    section: {
      borderWidth: 1,
      borderRadius: spacing.sm,
      borderColor: colors.background,
      gap: spacing.xxs,
      overflow: 'hidden',
    },
    appVersion: {
      textAlign: 'center',
    },
  });
