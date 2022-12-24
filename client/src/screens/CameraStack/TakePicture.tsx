import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from '@rneui/base';
import { useCard } from '../../contexts/card';


export default function TakePicture(props: any) {
  const { navigation } = props;
  const type = CameraType.back;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera>();
  const [height, setHeight] = useState<number>(0);

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

      navigation.navigate('CreateCard', { imageURI: image.uri });
    }
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setHeight((e.nativeEvent.layout.height - e.nativeEvent.layout.width) / 2);
      }}
    >
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
});