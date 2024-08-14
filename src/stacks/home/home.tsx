import React, { useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import { useGetProductsQuery } from '@/api';
import { AppTheme, useAppTheme } from '@/theme';
import { ShopItem } from '@/components/shop-item';

export const HomeScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const {
    data: products,

    isFetching,
    refetch,
  } = useGetProductsQuery({});
  const { width: screenWidth } = Dimensions.get('window');

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="Cool Store Banner"
          source={require('./../../assets/header-design.png')}
          style={{ height: 100, width: screenWidth }}
          resizeMode="contain"
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ShopItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
        refreshing={isFetching}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const makeStyles = ({ colors, spacing }: AppTheme) =>
  StyleSheet.create({
    listContainer: {
      padding: spacing.md,
    },
    header: {
      backgroundColor: colors.elevation.level2,
    },
    separator: {
      marginBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.onBackground,
      paddingBottom: spacing.sm,
    },
  });

export default HomeScreen;
