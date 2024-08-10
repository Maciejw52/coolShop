import { useAppTheme } from '@/hooks';
import { AppTheme } from '@/theme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

interface LinkPanelProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const LinkPanelComponent = ({ title, icon, onPress }: LinkPanelProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <List.Item
      key={title}
      title={<Text style={styles.title}>{title}</Text>}
      testID={`link-panel-${title}`}
      left={props => <List.Icon {...props} icon={icon} />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => onPress()}
      style={styles.listItem}
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
  });

export const LinkPanel = memo(LinkPanelComponent);
