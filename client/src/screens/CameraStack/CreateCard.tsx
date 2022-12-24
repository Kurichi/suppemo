import React, { useState } from "react";
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Button, Image, Text } from "@rneui/base";
import { useCard } from "../../contexts/card";

interface props {
  navigation: any,
  route: any
}

export const CreateCard = ({ navigation, route }: props) => {
  const { imageURI } = route.params;
  const [title, setTitle] = useState<string>('');
  const { modifyCard } = useCard();

  const apply = async () => {
    //カード作成の処理
    await modifyCard('upload', {
      picture: imageURI,
      title: title,
    });

    navigation.navigate('CameraTop');
  }
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>カードのなまえ</Text>
          <TextInput
            autoFocus={true}
            placeholder='なまえをきめてね'
            onChangeText={setTitle}
            value={title}
            style={styles.titleSpace}
            maxLength={20}
          />
        </View>

        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={{ uri: imageURI }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={[styles.button, { backgroundColor: '#D4D4D4' }]}>
            <Button
              type='clear'
              onPress={() => {

              }}
              title='やり直す'
              titleStyle={styles.buttonTitle}
            />
          </View>
          {title !== '' && <View style={[styles.button, { backgroundColor: '#FC6A2C' }]}>
            <Button
              type='clear'
              onPress={async () => {
                await apply();
                navigation.navigate('CameraTop');
              }}
              title='つくる'
              titleStyle={styles.buttonTitle}
            />
          </View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  titleSpace: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 50,
    fontSize: 20,
    borderRadius: 5,
  },
  titleContainer: {
    paddingTop: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#82292D',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#333",
    shadowOffset: { width: 4, height: 4 },
    marginHorizontal: 8,
    width: 160,
    height: 48,
    borderRadius: 12,
  },
  buttonTitle: {
    color: 'black',
    fontSize: 24,
  }
});