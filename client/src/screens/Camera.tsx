import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from '../components/Footer';




export default function Camera() {
  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>カードの写真をとろう！</Text>
      </View>
      <View style={styles.photoContainer}>
        <Image style={styles.photo} source={require('./../../assets/corn.jpg')} />
      </View>
      <View style={styles.cameraButtonContainer}>
        <View style={styles.cameraButton}>
          <Feather name="camera" size={60} color="black" />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>タイトル</Text>
        <TextInput style={styles.titleSpace} maxLength={20} />
      </View>
    </View >


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C83A3A',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  cameraButtonContainer: {
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSpace: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 50,
    fontSize: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  titleContainer: {
    paddingTop: 25,
    //backgroundColor: 'red',
    height: 200,
    alignItems: 'center',
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
  headlineContainer: {

    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,

  },



})