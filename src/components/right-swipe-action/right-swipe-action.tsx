import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { AppTheme, useAppTheme } from '@/theme';
import { Icon } from 'react-native-paper';

export const RightSwipeActionCard = ({
  onPressSeeMore,
  onPressDelete,
}: {
  onPressSeeMore: () => void;
  onPressDelete: () => void;
}) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <View style={styles.swipeableContainer}>
      <TouchableOpacity
        onPress={onPressSeeMore}
        accessibilityLabel="View Card Details"
        activeOpacity={0.7}
        style={styles.swipedButton}>
        <Icon source="eye" size={32} color={theme.colors.background} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDelete}
        accessibilityLabel="Delete Card"
        activeOpacity={0.7}
        style={[styles.swipedButton, styles.swipedButtonError]}>
        <Icon source="delete" size={32} color={theme.colors.onError} />
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    swipeableContainer: {
      flexDirection: 'column',
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      overflow: 'hidden',
      height: '100%',
      marginLeft: -spacing.sm,
    },
    swipedButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      flex: 1,
      backgroundColor: colors.onBackground,
    },
    swipedButtonError: {
      backgroundColor: colors.error,
    },
  });
