import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FSCard } from '../services/FileSystem';
import { Button } from '@rneui/base';
import { getCards, useCard } from '../contexts/card';

export default function EditCard(props: any) {
  const { naviagtion, route } = props;
  const { card_id } = route.params;
  const [new_name, setName] = useState<string>('');
  const { cards, modifyCard } = useCard();
  const card = getCards(cards, card_id);

  const deleteCard = async () => {
    await modifyCard('delete', card_id);
  }

  const setCard = async () => {
    await modifyCard('edit', card_id, new_name);
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
          source={{ uri: card != null ? card.uri : '' }}
        />
      </View>

    </View>
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