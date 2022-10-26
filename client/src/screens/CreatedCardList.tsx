import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@rneui/base';

import { Feather } from '@expo/vector-icons';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FileSystem } from '../components/FileSystem';

export default function CreatedCardList() {
  type card_detail = {
    id: number,
    name: string,
    uri: string,
    createdDate: string,
    exsists: boolean,
  }

  const [data, setData] = useState<Array<card_detail>>();
  const [sort_target, setTarget] = useState<string>('ascending');

  const fs = new FileSystem();
  useEffect(() => {
    const f = async () => {
      setData(await fs.getCardData())
      console.log('get data')
    }; f();
  }, []);

  const sort = async (target: string) => {

  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Feather name="search" size={24} color="white" />
          <TextInput />
        </View>
        <View>
          <Text>Sort</Text>
          <Button
            type='solid'
            onPress={() => sort(sort_target)}
          />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) =>
          <View style={styles.card}>
            <Image
              source={{ uri: item.uri }}
              style={styles.photo}
            />
            <Text>{item.name}</Text>
          </View>
        }
        numColumns={4}
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
  }
});