import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from '../components/Footer';




export default function Camera() {
  return (
    <View style={styles.container}>
      <View>
        <Text>しゃしんをとろう！</Text>
      </View>
      <View>
        <Image style={{ width: 120, height: 120, }} source={require('./../../assets/corn.jpg')} />
      </View>
      <View>
        <View style={styles.cameraButton}>
          <Feather name="camera" size={100} color="black" />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ justifyContent: 'center', alignItems: 'center', }}>タイトル</Text>
        <TextInput style={styles.titleSpace} />
      </View>
    </View >


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  image: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonImage: {
    width: 140,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSpace: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'red',
    height: 300,
    alignItems: 'center',
  },

})