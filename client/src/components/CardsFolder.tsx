import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


interface folder_type {
  id: number,
  feather_name: string,
  background_color: string,
}

export default function CardsFolder() {
  const folders: folder_type[] = [
    { id: 0, feather_name: "star-o", background_color: '#8BD8A5' },
    { id: 1, feather_name: "smile-o", background_color: '#8BD805' }
  ];


  return (
    <View style={styles.cardsFolder}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollBar}>
        {folders.map(data => {
          return (
            <View style={[styles.tag, { backgroundColor: data.background_color }]}>
              <Icon name={data.feather_name} size={48} color='white' />
            </View>
          );
        })}
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  scrollBar: {
    backgroundColor: 'blue',

  }
});