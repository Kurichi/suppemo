import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function  CardsFolder() {
  return (
    <View style={styles.cardsFolder}>
      <View style={styles.tag}>
        <Feather name="star" size={24} color="white" />
      </View>
      <View style={styles.folderFlame}>
        <View style={styles.folder}>
          <Text>Helllllllllllllllllllllo!</Text>
          <Text>Wooooooooooooooooooold</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsFolder: {
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  tag: {
    backgroundColor: '#8BD8A5',
    height: 50,
    width: 90,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  folderFlame: {
    backgroundColor: '#8BD8A5',
    flex: 1,
    borderTopRightRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  folder: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    flex: 1,
    borderRadius: 15,
    paddingVertical: 8,
    width: '94%',
  }
});