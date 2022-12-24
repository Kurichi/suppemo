import { Button } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import { getCards, useCard } from '../contexts/card';
import { deleteAllTemplates, useTemplates } from '../contexts/template';

interface props_type {
  current_ws: number,
  setCurrent: React.Dispatch<React.SetStateAction<number>>,
  isVertical: boolean,
  init_index: number,
}

export default function WorkSpace(props: props_type) {
  // deleteAllTemplates();

  const { cards } = useCard();
  const { current_ws, setCurrent, isVertical, init_index } = props
  const { templates, modifyTemplate } = useTemplates();

  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const position = { x: current_ws * 0.94 * windowWidth, y: 0, animated: false }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(position);
    }
  }, [isVertical]);

  useEffect(() => {
    const position = { x: (init_index ? init_index : current_ws) * 0.94 * windowWidth, y: 0, animated: false }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(position);
    }
  }, [init_index])

  const setCurrentID = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.targetContentOffset) {
      const x = e.nativeEvent.targetContentOffset.x;
      const index = Math.round(x / 0.94 / windowWidth);
      setCurrent(index);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.scrollContainer, { height: isVertical ? 200 : '90%' }]}>
        <ScrollView
          ref={scrollViewRef}
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
              return (_c ? {
                id: index,
                card_id: _c.id,
                exists: _c.exists,
                uri: _c.uri,
                name: _c.name,
              } : {
                id: index,
                card_id: -1,
                exists: false,
                uri: '',
                name: '',
              })
            });
            const colmns_length = Math.round(8 / 2);
            return (
              <View
                style={[{ width: windowWidth * 0.94 }, styles.frameContainer]}
                key={index}
              >
                <Text style={styles.title}>{template.name}</Text>
                <FlatList
                  data={items}
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      onPress={() => modifyTemplate('exit_card', { template_id: current_ws, index: item.id })}
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: item.uri }}
                          style={[styles.cardStyle,
                          {
                            width: windowWidth / (colmns_length + (colmns_length > template.item_num ? 0 : 1.5)),
                            height: windowWidth / (colmns_length + (colmns_length > template.item_num ? 0 : 1.5)),
                          },
                          ]}
                        />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  }
                  numColumns={colmns_length}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: '94%',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  cardStyle: {
    marginHorizontal: 8,
    marginVertical: 8,
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
  },
  imageContainer: {

  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
    fontSize: 12,
  },
});