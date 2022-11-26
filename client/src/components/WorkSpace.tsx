import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { getCards, useCard } from '../contexts/card';


export default function WorkSpace(props: ws_props) {
  const { card_ids } = props;
  const { cards } = useCard();
  const items = getCards(cards, card_ids);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) =>
          <Image
            source={{ uri: item.uri }}
            style={styles.cardStyle}
          />
        }
        numColumns={4}
      />
      <Text>aaaaaaaaaaaa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 160,
    width: '94%',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
  },
  cardStyle: {
    width: 100,
    height: 100,

  }
});