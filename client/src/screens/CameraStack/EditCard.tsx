import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@rneui/base';
import { getCards, useCard } from '../../contexts/card';
import { TextInput } from 'react-native-gesture-handler';
import { StylePropType } from 'react-native-gifted-chat';

export default function EditCard(props: any) {
  const { naviagtion, route } = props;
  const { card } = route.params;
  const [new_name, setName] = useState<string>('');
  const { modifyCard } = useCard();

  const deleteCard = async () => {
    await modifyCard('delete', {
      id: card.id,
    });
  }

  const setCard = async () => {
    await modifyCard('edit', {
      id: card.id,
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
      </View>
      <Image
        style={styles.image}
        source={{ uri: card.uri != null ? card.uri : '' }}
      />
      <View style={styles.nameChangeContainer}>
        <Text style={styles.nameChangeText}>なまえをかえる</Text>
        <TextInput
          defaultValue={card.name}
          onChangeText={(value) => { setName(value); }}
        />
      </View>
      <View style={styles.changeButtonContainer}>
        <Button
          color='error'
          style={styles.changeButton}
          onPress={setCard}
        >へんこうする</Button>
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
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  }
});