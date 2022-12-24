import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { getCards, getDeletedCards, useCard } from '../../contexts/card';
import { TextInput } from 'react-native-gesture-handler';
import { StylePropType } from 'react-native-gifted-chat';
import { useTemplates } from '../../contexts/template';

export default function EditCard(props: any) {
  const { navigation, route } = props;
  const { card } = route.params;
  const [new_name, setName] = useState<string>(card.name);
  const { cards, modifyCard } = useCard();
  const { modifyTemplate } = useTemplates();

  const deleteCard = async () => {
    await modifyCard('delete', {
      id: card.id,
    });

    await modifyTemplate('refresh', { nonexistCard_id: getDeletedCards(cards) });
  }

  const setCard = async (name: string) => {
    await modifyCard('edit', {
      id: card.id,
      title: name,
    });
  }

  const alert = () => {
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
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '94%' }}>
        <Button
          type='clear'
          buttonStyle={styles.backButton}
          titleStyle={{ color: 'black' }}
          title='もどる'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', width: '94%' }}>

        <Text style={styles.titleText}>カードのへんしゅう</Text>
        <View style={[styles.shadow, { width: '50%' }]}>
          <Button
            type='clear'
            icon={{
              name: "cancel",
              type: "material",
            }}
            buttonStyle={[styles.removeButton]}
            titleStyle={styles.buttonText}
            onPress={alert}
          />
        </View>
        <Image
          style={styles.image}
          source={{ uri: card.uri != null ? card.uri : '' }}
        />

        <View style={styles.rejectContainer}>
          <Text style={{ fontSize: 20, marginLeft: 4 }}>なまえをかえる</Text>
          <View style={styles.nameChangeTextBox} >
            <TextInput
              value={new_name}
              style={{ fontSize: 30, }}
              maxLength={8}
              onChangeText={(value) => { setName(value); }}
            />
          </View>
          <View style={styles.shadow}>
            <Button
              title='へんこうする'
              buttonStyle={styles.changeButton}
              titleStyle={styles.buttonText}
              onPress={() => {
                if (new_name === '') setCard('なまえがないよ');
                else setCard(new_name);
                navigation.goBack();
              }}
              type={"clear"}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  backButton: {
    width: 100,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 2,
  },
  nameChangeContainer: {
    justifyContent: "center",
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 20,
  },
  nameChangeTextBox: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderColor: 'rgba(100,100,100,0.2)',
    borderWidth: 2,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  changeButton: {
    width: '100%',
    backgroundColor: "#FC6A2C",
    borderRadius: 15,
  },
  removeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    paddingBottom: 8,
    width: '94%',
  },
  removeButton: {
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 200,
  },
  rejectContainer: {
    width: '100%',
    marginVertical: 24,
  },
  shadow: {
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  }
});