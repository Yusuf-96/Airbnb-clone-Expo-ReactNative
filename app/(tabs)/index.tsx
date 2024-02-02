import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from '@/components/ListingsMap';

const Page = () => {
  const [caterogy, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingsData, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 135}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={caterogy} /> */}

      <ListingsMap listings={listingsDataGeo}/>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
