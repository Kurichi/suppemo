import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@rneui/base';
import { getCards, useCard } from '../contexts/card';
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
  const { naviagtion, route } = props;
  const { card_id } = route.params;
  const [new_name, setName] = useState<string>('');
  const { cards, modifyCard } = useCard();
  const card = getCards(cards, card_id);

  const deleteCard = async () => {
    await modifyCard('delete', {
      id: card_id,
    });
  }

  const setCard = async () => {
    await modifyCard('edit', {
      id: card_id,
      title: new_name,
    });
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
          source={{ uri: card ? card.uri : '' }}
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