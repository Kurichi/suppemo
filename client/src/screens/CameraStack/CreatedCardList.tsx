import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

import { Feather } from '@expo/vector-icons';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useCard } from '../../contexts/card';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CreatedCardList(props: any) {
  const { navigation } = props;

  const { cards, modifyCard } = useCard();
  const [data, setData] = useState<Array<card_detail>>(cards);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setData(cards);
  }, [cards]);

  return (
    <View style={styles.container}>
      <Text style={styles.sceneTitle}>つくったカード</Text>
      <View style={styles.searchBoxContainer}>
        <Feather name="search" size={32} color="black" />
        <View style={styles.searchBox}>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        {
          data.length > 0 ? (
            <FlatList
              data={data.filter((d) => {
                return d.exists && !d.isDefault && d.name.includes(text);
              })}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate('EditCard', { card: item });
                  }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.photo}
                  />
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          ) : (
            <Text>
              カードがないよ
            </Text>
          )}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  sceneTitle: {
    fontSize: 32,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderTopWidth: 2,
    paddingTop: 8,
  },
  searchBox: {
    backgroundColor: 'white',
    width: '70%',
    height: 56,
    borderColor: 'rgba(200,200,200,0.4)',
    borderWidth: 4,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  photo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  selectBox: {
    width: '70%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0)',
    height: 40,
    borderRadius: 20,
  },
  dropBoxContainer: {
    alignItems: 'flex-end',
  },
  card: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    maxWidth: 100,

  },
  searchContainer: {
    backgroundColor: '#FCD12C',
  },
  listContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
});