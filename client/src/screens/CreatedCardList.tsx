import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

import { Feather } from '@expo/vector-icons';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useCard } from '../contexts/card';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function CreatedCardList(props: any) {
  const { navigation } = props;

  const { cards, modifyCard } = useCard();
  const [data, setData] = useState<Array<card_detail>>(cards);
  const [sort_target, setTarget] = useState<string>('ascending');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setData(cards);
  }, [cards]);

  // useFocusEffect(() => {
  //   console.log('test');
  // });

  const sort = async (target: string) => {
    console.log(sort_target)
    if (sort_target == "date_ascending") setData(data.sort((a, b) => a.id - b.id))
    else if (sort_target == "date_descending") setData(data.sort((a, b) => b.id - a.id))
    else if (sort_target == "frequency") setData(data.sort((a, b) => b.count - a.count))
    else if (sort_target == "name_ascending") setData(data.sort((a, b) => a.name > b.name ? -1 : 1))
    else if (sort_target == "name_descending") setData(data.sort((a, b) => a.name > b.name ? 1 : -1))
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Feather name="search" size={24} color="white" />
        <TextInput style={{ backgroundColor: 'white', width: '70%' }} />
      </View>
      <DropDownPicker
        items={[
          { label: "よく使う", value: "frequency" },
          { label: "なまえ　はやい順", value: "name_ascending" },
          { label: "なまえ　おそい順", value: "name_descending" },
          { label: "つくった順", value: "date_ascending" },
          { label: "古い順", value: "date_descending" },
        ]}
        value={sort_target}
        setValue={setTarget}
        multiple={false}
        open={open}
        setOpen={setOpen}
        onChangeValue={(item) => sort(item as string)}
        style={styles.selectBox}
        labelStyle={styles.dropBoxLabel}
        containerStyle={styles.dropBoxContainer}
        placeholder="ならべかえ"
      />
      <View style={styles.listContainer}>
        {
          data.length > 0 ? (
            <FlatList
              data={data.filter((d) => {
                return d.exists;
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
                  <Text>{item.name}</Text>
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
  },
  dropBoxLabel: {
    justifyContent: 'flex-end',
  },
  dropBoxContainer: {
    alignItems: 'flex-end',
  },
  card: {
    alignItems: 'center'
  },
  searchContainer: {
    backgroundColor: '#FCD12C',
  },
  listContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
});