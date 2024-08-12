import React, { useCallback, useMemo } from 'react';

import LinkPanel from '@/components/link-panel';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAccountData } from '@/store/slices/account-data-slice';
import { AppTheme, useAppTheme } from '@/theme';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { List, Snackbar, Text } from 'react-native-paper';
import { accountOptionsData } from './account-options';
import { AccountOption } from './types';
import { useNavigation } from '@react-navigation/native';
import { clearWallet } from '@/store/slices/wallet-slice';
import { purgeKeychainStorage } from '@/utils/keychain-utils';

export const AccountScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const disaptch = useAppDispatch();
  const { fullName, address } = useAppSelector(state => state.accountData);
  const { noOfCards } = useAppSelector(state => state.wallet);
  const navigation = useNavigation();

  // Temporary place to house snackbara
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
        disaptch(clearWallet());
        purgeKeychainStorage();
        onToggleSnackBar();
      }
    },
    [navigation],
  );

  const isActionRequired = (option: AccountOption): boolean => {
    switch (option.title) {
      case 'Manage personal details':
        return !fullName || !address;
      case 'Wallet':
        return noOfCards === 0;
      default:
        return false;
    }
  };

  console.log('asd');

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
                    showActionRequired={isActionRequired(option)}
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
