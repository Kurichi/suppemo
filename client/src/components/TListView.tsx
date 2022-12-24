import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useTemplates } from '../contexts/template';
import { useCard, getCards } from '../contexts/card';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface props {
  viewShot?: (viewShot: ViewShot, height: number, width: number) => Promise<void>,
  onPress?: (index: number) => void
}

export default function TListView(props: any) {
  const { viewShot, onPress } = props;
  const { templates, modifyTemplate } = useTemplates();
  const { cards } = useCard();
  const [title_list, setTitle] = useState<string[]>(
    templates.map((template, index) => { return template.name })
  );
  const viewShot_list = useRef<ViewShot[]>([]);
  var height = 168;
  var width = 200;

  const alert = (index: number, name: string) => {
    Alert.alert(
      'なまえのへんこう',
      'なまえをかえる？',
      [
        {
          text: 'かえる', onPress: () => {
            modifyTemplate('edit_title', { title: title_list[index] });
          }
        },
        {
          text: 'かえない', onPress: () => {
            setTitle(
              title_list.map((title, idx) => (idx === index ? name : title))
            );
          }
        }
      ]
    )
  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {templates.map((template, index) => {
          const cards_info = getCards(cards, template.item_ids);
          const items = cards_info.map((_c, i) => {
            return ({
              id: i,
              uri: _c.uri,
              name: _c.name,
            })
          });
          const columns_length = Math.round(template.item_ids.length / 2);

          const upper_cards: { id: number, uri: string, name: string }[] = []
          const lower_cards: { id: number, uri: string, name: string }[] = []

          for (var i = 0; i < items.length; i++) {
            if (typeof items[i] == 'undefined') continue;
            if (columns_length > i) upper_cards.push(items[i])
            else lower_cards.push(items[i])
          }


          return (
            <View style={styles.frame} key={index}>
              <TextInput
                editable={viewShot ? false : true}
                selectTextOnFocus={viewShot ? false : true}
                value={title_list[index]}
                style={styles.title}
                onChangeText={(text) => { alert(index, text) }}
              />
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  onPress={() => {
                    if (viewShot) viewShot(viewShot_list.current[index], height, width)
                    else if (onPress) onPress(index)
                    else console.log(viewShot);
                  }}

                >
                  <View style={styles.frameContainer}>
                    <ViewShot
                      ref={ref => { if (ref != null) viewShot_list.current[index] = ref }}
                      onLayout={(e) => {
                        height = e.nativeEvent.layout.height;
                        width = e.nativeEvent.layout.width;
                      }}
                    >
                      <View style={{ width: '100%', flexDirection: 'row', marginTop: 4 }}>
                        {(upper_cards.length != 0) &&
                          upper_cards.map((c, index1) => (
                            <View style={styles.imageContainer} key={index1}>
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
                            <View style={styles.imageContainer} key={index1}>
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

                    </ViewShot>
                  </View>
                </TouchableOpacity>
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