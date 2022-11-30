import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FSCard } from '../services/FileSystem';
import { Button } from '@rneui/base';

export default function EditCard(props: any) {
  const { naviagtion, route } = props;
  const { card_data } = route.params;
  console.log(card_data);

  const [new_name, setName] = useState<string>('');

  const fs = new FSCard();

  const deleteCard = async () => {
    //画面遷移

    fs.deleteCard(card_data.id)
  }

  const setCard = async () => {
    await fs.modifyCardData(card_data.id, { 'name': new_name });
  }

  return (
    <View>
      <View>
        <Text>カードのへんしゅう</Text>
      </View>
      <View>
        <Button
          color='error'
          onPress={() => {
            deleteCard();
            naviagtion.navigate('CreatedCardList');
          }}
        >カードのさくじょ</Button>
        <Image
          style={styles.photo}
          source={{ uri: card_data.uri }}
        />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  photo: {
    width: '90%',
    paddingTop: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});