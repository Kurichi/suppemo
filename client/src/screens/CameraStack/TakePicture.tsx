import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '@rneui/base';
import { useCard } from '../../contexts/card';



export default function TakePicture(props: any) {
  const { navigation } = props;
  const type = CameraType.back;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>();
  const [picture, setPicture] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [height, setHeight] = useState<number>(0);

  const { modifyCard } = useCard()

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
    setPicture(await modifyCard('upload', {
      picture: picture,
      title: title,
    }));
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setHeight((e.nativeEvent.layout.height - e.nativeEvent.layout.width) / 2);
      }}
    >
      {!picture ? (
        <Camera
          style={{ flex: 1, alignItems: 'center' }}
          type={type}
          ref={(ref: Camera) => {
            setCamera(ref);
          }}>
          <View style={{ width: '100%', height: height, backgroundColor: 'rgba(0,0,0,0.7)' }}>
          </View>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            height: height,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
            <Button
              type='clear'
              buttonStyle={styles.cameraButton}
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
                source={{ uri: picture }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <View style={[styles.button, { backgroundColor: '#D4D4D4' }]}>
                <Button
                  type='clear'
                  onPress={() => {
                    setPicture('')
                  }}
                  title='とりなおす'
                  titleStyle={styles.buttonTitle}
                />
              </View>
              {title !== '' && <View style={[styles.button, { backgroundColor: '#FC6A2C' }]}>
                <Button
                  type='clear'
                  onPress={() => {
                    apply();
                    navigation.navigate('CameraTop');
                  }}
                  title='つくる'
                  titleStyle={styles.buttonTitle}
                />
              </View>}
            </View>
          </View>
        </TouchableWithoutFeedback>

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
    width: 160,
    borderRadius: 60,
    backgroundColor: 'red',
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