import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useTemplates } from '../contexts/template';
import { useCard, getCards } from '../contexts/card';

export default function TemplateList() {

  const { templates } = useTemplates();
  const { cards } = useCard();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {templates.map((template, index) => {
          const cards_info = getCards(cards, template.item_ids);
          const items = cards_info.map((_c, index) => {
            return ({
              id: index,
              card_id: _c.id,
              exists: _c.exists,
              uri: _c.uri,
              name: _c.name,
            })
          });
          const colmns_length = Math.round(items.length / 2);
          return (
            <View style={styles.frame}>
              <TextInput
                value={template.name}
                style={styles.title}
              />
              <View
                style={[{ width: windowWidth * 0.94 }, styles.frameContainer]}
                key={index}
              >
                {!(template.item_num != 0) ? (
                  <Text>カードがないよ</Text>
                ) : (
                  <FlatList
                    data={items}
                    renderItem={
                      ({ item }) => (
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: item.uri }}
                            style={[styles.cardStyle,
                            {
                              width: colmns_length > template.item_num ? 90 : 64,
                              height: colmns_length > template.item_num ? 90 : 64,
                            },
                            ]}
                          />
                        </View>
                      )}
                    numColumns={colmns_length}
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    alignItems: 'center',
  },
  cardStyle: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  scrollContainer: {
    width: '94%',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,

  },
  frameContainer: {
    alignItems: 'center',
    height: 168,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  frame: {
    marginVertical: 16,
    alignItems: 'center',
  }
});