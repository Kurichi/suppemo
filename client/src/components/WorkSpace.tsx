import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

// const Array = [
//   {
//     'corn'
//   },
// ];



export default function WorkSpace() {
  const items: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={items}
          renderItem={({ item }) =>
            <View>
              <Image
                source={require('../../assets/cards/1.jpg')}
                style={styles.cardStyle}
              />
            </View>
          }
          numColumns={4}
        />
      </View>
      <Image source={require('./../../assets/corn.jpg')} />
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