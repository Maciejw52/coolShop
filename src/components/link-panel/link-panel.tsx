import React, { memo, useMemo } from 'react';
import { useAppTheme } from '@/theme';
import { AppTheme } from '@/theme';
import { StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

interface LinkPanelProps extends React.ComponentProps<typeof List.Item> {
  title: string;
  icon: string;
  status?: 'error' | 'default';
  showActionRequired?: boolean;
  onPress: () => void;
}

const LinkPanelComponent = ({
  title,
  icon,
  status = 'default',
  showActionRequired = false,
  onPress,
  testID = `link-panel-${title}`,
  ...props
}: LinkPanelProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const listItemStyles = [
    status === 'default' && styles.listItem,
    status === 'error' && styles.errorListItem,
  ];

  return (
    <List.Item
      key={title}
      title={title}
      titleStyle={styles.title}
      description={
        showActionRequired ? (
          <Text
            testID={`action-required-${title}`}
            style={styles.descriptionError}>
            Action Required
          </Text>
        ) : undefined
      }
      testID={`link-panel-${title}`}
      left={props => <List.Icon {...props} icon={icon} />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
      onPress={onPress}
      style={listItemStyles}
      {...props}
    />
  );
};

const makeStyles = ({ colors }: AppTheme) =>
  StyleSheet.create({
    title: {
      color: colors.inverseSurface,
    },
    descriptionError: {
      color: colors.error,
    },
    listItem: {
      backgroundColor: colors.inverseOnSurface,
    },
    errorListItem: {
      backgroundColor: colors.errorContainer,
    },
  });

export const LinkPanel = memo(LinkPanelComponent);
