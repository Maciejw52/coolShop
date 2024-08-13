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
import { ActivityIndicator } from 'react-native-paper';

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
    <SafeAreaView>
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
  });

export default HomeScreen;
