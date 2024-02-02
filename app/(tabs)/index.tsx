import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [caterogy, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingsData, []);
  const geoitems = useMemo(() => listingsDataGeo, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={caterogy} /> */}

      <ListingsMap listings={geoitems} />
      <ListingsBottomSheet listings={items} category={caterogy} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
