import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function  WorkSpace() {
  return (
    <View style={styles.container}>
      <Text>aaaaaaaaaaaa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 160,
    width: '94%',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
  }
});