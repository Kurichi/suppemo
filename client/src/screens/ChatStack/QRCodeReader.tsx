import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Button } from '@rneui/base';

export default function QRCodeReader(props: any) {

  const [hasPermission, setHaspermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<string>('');

  const { navigation } = props;

  useEffect(() => {
    const getBarCodeScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    };

    getBarCodeScannerPermission();
  }, []);

  const handleBarCodeScanned = (({ type, data }: BarCodeScannerResult) => {
    setScanned(data);
  });

  const applyScanned = () => {
    //友達追加の処理

    //戻る
    navigation.goBack()
  };

  if (hasPermission === null) {
    return <Text>カメラの許可をください</Text>;
  }
  if (hasPermission === false) {
    return <Text>カメラの許可がありません</Text>;
  }


  return (
    <View style={styles.container}>
      {!scanned ? (
        <View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
          <Button
            title={'じぶんのQRコード'}
            type={'outline'}
            buttonStyle={styles.myButton}
            onLongPress={() => navigation.navigate('show')}
          />
        </View>
      ) : (
        <View>
          <Text>{scanned}</Text>
          <Button
            title={'とりなおす'}
            onPress={() => setScanned('')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Button
            title={'ともだちになる'}
            onPress={() => applyScanned()}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}

          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    width: 240,
    height: 240,
  },
  qrCodeButton: {
    bottom: 10,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#ff8935',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  myButton: {
    borderRadius: 5,
    margin: 10,
  },
  addFriendsContainer: {
    margin: 10,
  },



});