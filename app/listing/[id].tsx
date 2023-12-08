import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const DeteilsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>DeteilsScreen</Text>
    </View>
  );
};

export default DeteilsScreen;

const styles = StyleSheet.create({});
