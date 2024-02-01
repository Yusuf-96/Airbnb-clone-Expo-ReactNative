import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

interface Props {
  listings: any[];
  category: string;
}

const Listings: React.FC<Props> = ({ listings, category }: Props) => {
  useEffect(() => { 
    console.log('Listings');
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
