import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FileSystem } from '../components/FileSystem';
import { Button } from '@rneui/base';

type card_detail = {
  id: number,
  name: string,
  uri: string,
  createdDate: string,
  exists: boolean,
}

export default function EditCard(props: any) {
  const { card_id } = props;
  const [new_name, setName] = useState<string>('');
  const [card_data, setData] = useState<card_detail>({
    id: -1,
    name: '',
    uri: '',
    createdDate: '',
    exists: false,
  });

  const fs = new FileSystem();
  useEffect(() => {
    const f = async () => {
      setData(await fs.getCardData(card_id))
      console.log('get data')
    }; f();
  }, []);

  const deleteCard = async () => {

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
        <Button color='error'>カードのさくじょ</Button>
        <Image
          source={{ uri: card_data.uri }}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

});