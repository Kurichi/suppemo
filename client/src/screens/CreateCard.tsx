import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from '@rneui/base';

export default function CreateCard(props: any) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>自分だけのカードをつくろう！</Text>
      </View>
      <View style={styles.selectButtonContainer}>
        <View style={styles.button}>
          <Button
            title='しゃしんをとる'
            buttonStyle={{
              height: 100,
              borderColor: 'black',
            }}
            titleStyle={styles.buttonText}
            raised
            type='outline'
            icon={{
              name: 'camera',
              size: 40,
              color: 'black',
              type: 'feather',
              iconStyle: styles.iconSpace,
            }}
            radius={20}
            onPress={() => {
              navigation.navigate('TakePhoto');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='しゃしんをつかう'
            buttonStyle={{
              height: 100,
              borderColor: 'black',
            }}
            titleStyle={styles.buttonText}
            raised
            type='outline'
            icon={{
              name: 'picture-o',
              size: 40,
              color: 'black',
              type: 'font-awesome',
              iconStyle: styles.iconSpace,
            }}
            radius={20}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='つくったしゃしんをみる'
            buttonStyle={{
              height: 100,
              borderColor: 'black',
            }}
            titleStyle={styles.buttonText}
            raised
            type='outline'
            icon={{
              name: 'camera',
              size: 40,
              color: 'black',
              type: 'feather',
              iconStyle: styles.iconSpace,
            }}
            radius={20}
            onPress={() => {
              navigation.navigate('CreatedCardList');
            }}
          />
        </View>

      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  headlineContainer: {
    marginTop: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 25,
  },
  selectButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#333",
    shadowOffset: { width: 4, height: 4 },
    marginBottom: 240,
  },
  button: {
    width: 350,
    height: 100,
    margin: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  iconSpace: {
    marginRight: 40,


  }


});