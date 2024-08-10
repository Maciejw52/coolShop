import { useAppTheme } from '@/hooks';
import { AppTheme } from '@/theme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

interface LinkPanelProps {
  title: string;
  icon: string;
  status?: 'error' | 'default';
  onPress: () => void;
}

const LinkPanelComponent = ({
  title,
  icon,
  onPress,
  status = 'default',
}: LinkPanelProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const listItemStyles = [
    styles.listItem,
    status === 'error' && styles.errorListItem,
  ];

  return (
    <List.Item
      key={title}
      title={<Text style={styles.title}>{title}</Text>}
      testID={`link-panel-${title}`}
      left={props => <List.Icon {...props} icon={icon} />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => onPress()}
      style={listItemStyles}
    />
  );
};

const makeStyles = ({ colors }: AppTheme) =>
  StyleSheet.create({
    title: {
      color: colors.inverseSurface,
    },
    listItem: {
      backgroundColor: colors.inverseOnSurface,
    },
    errorListItem: {
      backgroundColor: colors.errorContainer,
    },
  });

export const LinkPanel = memo(LinkPanelComponent);
