import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { getCards, useCard } from '../../contexts/card';
import { TextInput } from 'react-native-gesture-handler';
import { StylePropType } from 'react-native-gifted-chat';

export default function EditCard(props: any) {
  const { navigation, route } = props;
  const { card } = route.params;
  const [new_name, setName] = useState<string>(card.name);
  const { modifyCard } = useCard();

  const deleteCard = async () => {
    await modifyCard('delete', {
      id: card.id,
    });
  }

  const setCard = async (name: string) => {
    await modifyCard('edit', {
      id: card.id,
      title: name,
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 16 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>カードのへんしゅう</Text>
        </View>
        <View style={styles.removeButtonContainer}>
          <Button
            buttonStyle={styles.removeButton}
            title='もどる'
            color='warning'
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            title='さくじょ'
            color='error'
            buttonStyle={styles.removeButton}
            onPress={() => {
              Alert.alert(
                '本当に消しますか？', '',
                [
                  {
                    text: 'はい', onPress: () => {
                      deleteCard();
                      navigation.goBack();
                    },
                  },
                  { text: 'やめる' }
                ]
              )
            }}>
          </Button>
        </View>
        <Image
          style={styles.image}
          source={{ uri: card.uri != null ? card.uri : '' }}
        />
        <Text style={styles.nameChangeText}>なまえをかえる</Text>
        <TextInput
          value={new_name}
          style={styles.nameChangeTextBox}
          maxLength={8}
          onChangeText={(value) => { setName(value); }}
        />
        {/* <View style={styles.changeButtonContainer}> */}
        <Button
          title='へんこうする'
          buttonStyle={styles.changeButton}
          titleStyle={{
            color: 'black',
          }}
          onPress={() => {
            if (new_name === '')
              setCard('なまえがないよ');
            else
              setCard(new_name);
            navigation.goBack();
          }}
          type={"clear"}
        />
        {/* </View> */}
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
  },
  titleContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
  },
  nameChangeContainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 20,
  },
  nameChangeText: {
    fontSize: 20,
  },
  nameChangeTextBox: {
    height: 100,
    fontSize: 30,
    borderRadius: 5,
    backgroundColor: "#FFFFFF"
  },
  changeButtonContainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'red',
  },
  changeButton: {
    height: 100,
    backgroundColor: "#FC6A2C",
    borderRadius: 15,

  },
  removeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    flexDirection: 'row',
  },
  removeButton: {
    justifyContent: 'center',
    borderRadius: 15,
    height: 80,
    width: 150,
    marginHorizontal: 10,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  }
});