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
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

export default function TemplateList() {

  const { templates } = useTemplates();
  const { cards } = useCard();
  const { width: windowWidth } = useWindowDimensions();

  const renderCardSpace = (items: { id: number, uri: string, name: string }[], columns_length: number) => (
    <View style={styles.frameContainer}>
      <FlatList
        data={items}
        renderItem={
          ({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.uri }}
                style={[styles.cardStyle,
                {
                  width: columns_length > items.length ? 90 : 64,
                  height: columns_length > items.length ? 90 : 64,
                },
                ]}
              />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          )}
        numColumns={columns_length}

      />
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {templates.map((template, index) => {
          const cards_info = getCards(cards, template.item_ids);
          const items = cards_info.map((_c, index) => {
            return ({
              id: index,
              uri: _c.uri,
              name: _c.name,
            })
          });
          const columns_length = Math.round(template.item_ids.length / 2);

          const upper_cards: { id: number, uri: string, name: string }[] = []
          const lower_cards: { id: number, uri: string, name: string }[] = []
          console.log(columns_length);
          for (var i = 0; i < items.length; i++) {
            if (typeof items[i] == 'undefined') continue;
            if (columns_length > i) upper_cards.push(items[i])
            else lower_cards.push(items[i])
          }

          // console.log(upper_cards)
          // console.log(lower_cards)
          console.log(items)
          return (
            <View style={styles.frame}>
              <TextInput
                value={template.name}
                style={styles.title}
              />
              <View style={styles.frameContainer} >
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 4 }}>
                  {(upper_cards.length != 0) &&
                    upper_cards.map((c, index1) => (
                      <View style={styles.imageContainer} >
                        <Image
                          source={{ uri: c.uri }}
                          style={[styles.cardStyle,
                          {
                            width: columns_length > items.length ? 90 : 64,
                            height: columns_length > items.length ? 90 : 64,
                          },
                          ]}
                        />
                        <Text style={styles.cardTitle}>{c.name}</Text>
                      </View>
                    ))}
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginBottom: 4 }}>
                  {(lower_cards.length != 0) &&
                    lower_cards.map((c, index1) => (
                      <View style={styles.imageContainer} >
                        <Image
                          source={{ uri: c.uri }}
                          style={[styles.cardStyle,
                          {
                            width: columns_length > items.length ? 90 : 64,
                            height: columns_length > items.length ? 90 : 64,
                          },
                          ]}
                        />
                        <Text style={styles.cardTitle}>{c.name}</Text>
                      </View>
                    ))}
                </View>

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
    justifyContent: 'center',
    height: 168,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 30,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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