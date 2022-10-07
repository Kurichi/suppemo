import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import { NumericAnimation } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';

interface folder_type {
  id: number,
  feather_name: string,
  background_color: string,
  cards_id: number[],
}

export default function CardsFolder() {
  const folders: folder_type[] = [
    { id: 0, feather_name: "star-o", background_color: '#8BD1A5', cards_id: [1, 1, 2, 1, 2, 1] },
    { id: 1, feather_name: "star-o", background_color: '#1BD2A5', cards_id: [0, 1, 2] },
    { id: 2, feather_name: "star-o", background_color: '#2BD3A5', cards_id: [0, 1, 2] },
    { id: 3, feather_name: "star-o", background_color: '#3BD4A5', cards_id: [0, 1, 2] },
    { id: 4, feather_name: "smile-o", background_color: '#8B5805', cards_id: [0, 1, 2] },
    { id: 5, feather_name: "star-o", background_color: '#4BD6A5', cards_id: [0, 1, 2] },
    { id: 6, feather_name: "star-o", background_color: '#5BD7A5', cards_id: [0, 1, 2] },
    { id: 7, feather_name: "star-o", background_color: '#7BD8A5', cards_id: [0, 1, 2] }
  ];

  const [selectedfolder, setSelectCard] = useState<number>(0);

  return (
    <View style={styles.cardsFolder}>
      <View>
        <ScrollView
          horizontal={true}
          style={styles.scrollBar}
        >
          {folders.map(data => {
            return (
              <View style={[styles.tag, { backgroundColor: data.background_color }]}>
                <Button
                  type='clear'
                  icon={{
                    name: data.feather_name,
                    type: 'font-awesome',
                    size: 36,
                    color: 'white',
                  }}
                  onPress={() => {
                    setSelectCard(data.id);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={[styles.folderFlame, { backgroundColor: folders[selectedfolder].background_color }]}>
        <View style={styles.folder}>
          <FlatList
            data={folders[selectedfolder].cards_id}
            renderItem={({ item }) =>
              <View>
                <Image
                  source={{
                    //uri: '../../assets/cards/' + item.toString() + '.jpg'
                    uri: '../../assets/cards/1.jpg'
                  }}
                />
                <Text>{'../../assets/cards/' + item.toString() + '.jpg'}</Text>
                <Text>{item.toString()}</Text>
              </View>
            }
            numColumns={4}
          />
        </View>
      </View>
    </View >
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
    backgroundColor: '#FFF8B0',
  }
});