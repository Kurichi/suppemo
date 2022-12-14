import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Button } from '@rneui/base';

export default function QRCodeReader() {

  const [hasPermission, setHaspermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    };

    getBarCodeScannerPermission();
  }, []);

  const handleBarCodeScanned = (({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  });

  if (hasPermission === null) {
    return <Text>カメラの許可をください</Text>;
  }
  if (hasPermission === false) {
    return <Text>カメラの許可がありません</Text>;
  }

  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && <Button title={'とりなおす'} onPress={() => setScanned(false)} />}
      <Text>{hasPermission == true ? 'true' : 'false'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});