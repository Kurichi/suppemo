import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

import { Feather } from '@expo/vector-icons';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FSCard } from '../components/FileSystem';
import { Picker } from '@react-native-picker/picker';

export default function CreatedCardList() {
  type card_detail = {
    id: number,
    name: string,
    uri: string,
    count: number,
    createdDate: string,
    exists: boolean,
  }

  const [data, setData] = useState<Array<card_detail>>([]);
  const [sort_target, setTarget] = useState<string>('ascending');

  const fs = new FSCard();
  useEffect(() => {
    const f = async () => {
      setData(await fs.getCardData())
      console.log('get data')
      fs._showJSON();
    }; f();
  }, []);

  const sort = async (target: string) => {
    setTarget(target)
    if (sort_target == "date_ascending") setData(data.sort((a, b) => a.id - b.id))
    else if (sort_target == "date_descending") setData(data.sort((a, b) => b.id - a.id))
    else if (sort_target == "frequency") setData(data.sort((a, b) => b.count - a.count))
    else if (sort_target == "name_ascending") setData(data.sort((a, b) => a.name > b.name ? -1 : 1))
    else if (sort_target == "name_descending") setData(data.sort((a, b) => a.name > b.name ? 1 : -1))
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View>
          <Feather name="search" size={24} color="white" />
          <TextInput />
        </View>
        <View>
          <Text>Sort</Text>
          <Picker
            selectedValue={sort_target}
            onValueChange={(itemValue: string, itemIndex) =>
              sort(itemValue)
            }
          >
            <Picker.Item label="よく使う" value="frequency" />
            <Picker.Item label="なまえ　はやい順" value="name_ascending" />
            <Picker.Item label="なまえ　おそい順" value="name_descending" />
            <Picker.Item label="つくった順" value="date_ascending" />
            <Picker.Item label="つくった順　ぎゃく" value="date_descending" />
          </Picker>
        </View>
        <View>

        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={styles.card}

          >
            <Image
              source={{ uri: item.uri }}
              style={styles.photo}
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        }
        numColumns={3}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
  },
  photo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  card: {
    alignItems: 'center'
  },
  searchContainer: {
    backgroundColor: '#FCD12C',
  },
});