import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import { NumericAnimation } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { useCard, getCards } from '../contexts/card';
import { useTemplates } from '../contexts/template';
import { Audio } from 'expo-av';
import { Sounder } from './Sounder';

export default function CardsFolder(props: { current_ws: number }) {


  const [current_index, setSelectCard] = useState<number>(0);
  const { cards, modifyCard } = useCard();
  const { modifyTemplate } = useTemplates();
  const { current_ws } = props;


  const folders: folder_type[] = [];

  var ccard_ids: number[] = [];
  for (const _c of cards) if (_c.exists) ccard_ids.push(_c.id);

  const createdCardFolder: folder_type = {
    id: -1,
    iconName: "star-o",
    type: 'font-awesome',
    background_color: '#d43ba3',
    cards_ids: ccard_ids,
  }

  folders.push(createdCardFolder);

  return (
    <View style={styles.cardsFolder}>
      <View>
        <ScrollView
          horizontal={true}
          style={styles.scrollBar}
        >
          {folders.map((data, index) => {
            return (
              <View style={[styles.tag, { backgroundColor: data.background_color }]} key={index}>
                <Button
                  type='clear'
                  icon={{
                    name: data.iconName,
                    type: data.type,
                    size: 36,
                    color: 'white',
                  }}
                  onPress={() => {
                    setSelectCard(index);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={[styles.folderFlame, { backgroundColor: folders[current_index].background_color }]}>
        <View style={styles.folder}>
          <FlatList
            data={getCards(cards, folders[current_index].cards_ids)}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => { console.log(current_ws); modifyTemplate('add_card', { template_id: current_ws, card_id: item.id }) }}
              >
                {item.exists &&
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.uri }} style={styles.card} />
                    <Text style={styles.cardTitle}>{item.name}</Text>
                  </View>}
              </TouchableOpacity>
            }
            numColumns={3}
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
    alignItems: 'center',
  },
  scrollBar: {
    backgroundColor: '#FFF8B0',
  },
  card: {
    height: 100,
    width: 100,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imageContainer: {

  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
    fontSize: 14,
  }
});