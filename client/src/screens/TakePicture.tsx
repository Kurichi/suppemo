import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Footer from '../components/Footer';
import { Camera, CameraCapturedPicture, CameraPictureOptions, CameraProps, CameraType } from 'expo-camera';



export default function TakePicture() {
  const type = CameraType.back;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>();
  const [picture, setPicture] = useState<string>();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>カメラ機能を有効にしてください</Text>
        <Button onPress={requestPermission} title="カメラの許可" />
      </View>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      setPicture(image.uri);
    }
  }

  const apply = () => {
    //カード作成の処理
  }

  return (
    <View style={styles.container}>
      {!picture ? (
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref: Camera) => {
            setCamera(ref);
          }}>
          <View style={styles.cameraButton}>
            <Feather name="camera" size={60} color="black" />
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>

          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>カードの写真をとろう！</Text>
          </View>

          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={{ uri: picture }}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>タイトル</Text>
            <TextInput style={styles.titleSpace} maxLength={20} />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => setPicture('')}
              title='とりなおす'
              color='black'
            />
            <Button
              onPress={() => apply()}
              title='つくる'
              color='black'
            />
          </View>
        </View>
      )}
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
  titleSpace: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 50,
    fontSize: 20,
    borderRadius: 5,
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  }



})