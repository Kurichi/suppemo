import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FSCard } from '../components/FileSystem';
import { Button } from '@rneui/base';
import { TextInput } from 'react-native-gesture-handler';
import { StylePropType } from 'react-native-gifted-chat';

type card_detail = {
  id: number,
  name: string,
  uri: string,
  createdDate: string,
  exists: boolean,
}

export default function EditCard(props: any) {
  const { route } = props;
  const { card_id } = route.params;
  const [new_name, setName] = useState<string>('');
  const [card_data, setData] = useState<card_detail>({
    id: -1,
    name: '',
    uri: '',
    createdDate: '',
    exists: false,
  });

  const fs = new FSCard();
  useEffect(() => {
    const f = async () => {
      const my_card_detail = await fs.getCardData(card_id);
      setData(my_card_detail);
      console.log('aaa' + my_card_detail.id + card_data.id)
      console.log(card_data.id);
    }; f();
  }, []);

  const deleteCard = async () => {
    //画面遷移
    console.log(card_data.id)
    fs.deleteCard(card_data.id)
  }

  const setCard = async () => {
    await fs.modifyCardData(card_data.id, { 'name': new_name });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>カードのへんしゅう</Text>
      </View>
      <View style={styles.removeButtonContainer}>
        <Button
          color='error'
          style={styles.removeButton}
          onPress={deleteCard}>
          カードのさくじょ
        </Button>
        <Image
          source={{ uri: card_data.uri }}
        />
      </View>
      <View style={styles.nameChangeContainer}>
        <Text style={styles.nameChangeText}>なまえをかえる</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.changeButtonContainer}>
        <Button color='error' style={styles.changeButton}>へんこうする</Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
  },
  nameChangeContainer: {
    justifyContent: "center",
  },
  nameChangeText: {
    fontSize: 35,
  },
  nameChangeTextBox: {
    width: 30,
    height: 30,
  },
  changeButtonContainer: {
    justifyContent: "center",
  },
  changeButton: {
    width: 200,
    height: 150,
    backgroundColor: "#FC6A2C",
    borderRadius: 15,

  },
  removeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  removeButton: {
    justifyContent: 'center',

  },

});