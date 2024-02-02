import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings: React.FC<Props> = ({
  listings: items,
  category,
  refresh,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: 'absolute', right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" color={'#000'} size={24} />
          </TouchableOpacity>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontFamily: 'mon-semi', fontSize: 16, flex: 1 }}>
              {item.name}
            </Text>
            <Ionicons
              name="star"
              size={16}
              style={{ marginLeft: 'auto', marginRight: 5 }}
            />
            <Text style={{ fontFamily: 'mon-semi' }}>
              {item.review_scores_rating / 20}
            </Text>
          </View>
          <Text style={{ fontFamily: 'mon-regular' }}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontFamily: 'mon-semi' }}>£{item.price}</Text>
            <Text style={{ fontFamily: 'mon-regular' }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={<Text style={styles.info}>{items.length}</Text>}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-semi',
    fontSize: 16,
    marginTop: 4,
  },
});
