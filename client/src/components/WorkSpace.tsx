import { Button } from '@rneui/base';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { getCards, useCard } from '../contexts/card';
import { useTemplates } from '../contexts/template';

export default function WorkSpace() {
  const { cards } = useCard();
  const [current_ws, setCurrent] = useState<number>(0);
  const { templates, modifyTemplate } = useTemplates();

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const setCurrentID = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.targetContentOffset) {
      const x = e.nativeEvent.targetContentOffset.x;
      const index = Math.round(x / 0.94 / windowWidth);
      console.log(`ws index: ${index}`);
      setCurrent(index);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ], { useNativeDriver: false })}
          onScrollEndDrag={setCurrentID}
          scrollEventThrottle={1}
        >
          {templates.map((template, index) => {
            const cards_info = getCards(cards, template.item_ids);
            const items = cards_info.map((_c, index) => {
              return ({
                id: `${index}`,
                card_id: _c.id,
                exists: _c.exists,
                uri: _c.uri,
              })
            });
            return (
              <View
                style={[{ width: windowWidth * 0.94, height: 250 }, styles.frameContainer]}
                key={index}
              >

                <Text style={styles.title}>{template.name}</Text>
                <FlatList
                  data={items}
                  renderItem={({ item }) =>
                    <View>
                      {item.exists ? (
                        <Image source={{ uri: item.uri }} style={styles.cardStyle} />
                      ) : (
                        <View style={[styles.cardStyle, styles.emptyBox]} />
                      )
                      }
                    </View>
                  }
                  numColumns={4}
                />
              </View>
            );
          })}
        </ScrollView>
        <Button
          color='error'
          onPress={() => { modifyTemplate('') }}
        >新規作成</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 200,
    width: '94%',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
  },
  cardStyle: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  scrollContainer: {
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
  },
  frameContainer: {
    alignItems: 'center',
  },
  emptyBox: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});