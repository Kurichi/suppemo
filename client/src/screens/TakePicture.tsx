import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '@rneui/base';
import { FileSystem } from '../components/FileSystem';



export default function TakePicture() {
  const type = CameraType.back;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>();
  const [picture, setPicture] = useState<string>('');
  const [title, setTitle] = useState<string>('');

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

  const apply = async () => {
    //カード作成の処理
    const fs = new FileSystem();
    const new_picture_path = await fs.savePicture(picture, title);
    setPicture(new_picture_path);
  }

  return (
    <View style={styles.container}>
      {!picture ? (
        <Camera
          style={{ flex: 1, alignItems: 'center' }}
          type={type}
          ref={(ref: Camera) => {
            setCamera(ref);
          }}>
          <View style={styles.cameraButton}>
            <Button
              type='clear'
              onPress={() => takePicture()}
              icon={{
                name: 'camera',
                type: 'font-awesome',
                size: 60,
                color: 'black',
              }}
            />
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>カードのなまえ</Text>
            <TextInput
              onChangeText={setTitle}
              value={title}
              style={styles.titleSpace}
              maxLength={20}
            />
          </View>

          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={{ uri: picture }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={[styles.button, { backgroundColor: '#D4D4D4' }]}>
              <Button
                type='clear'
                onPress={() => setPicture('')}
                title='とりなおす'
                titleStyle={styles.buttonTitle}
              />
            </View>
            <View style={[styles.button, { backgroundColor: '#FC6A2C' }]}>
              <Button
                type='clear'
                onPress={() => apply()}
                title='つくる'
                titleStyle={styles.buttonTitle}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 60,
    bottom: 10,
    backgroundColor: 'red',
    position: 'absolute',
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
  headlineContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,

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



})