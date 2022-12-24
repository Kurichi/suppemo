import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Button, Image } from '@rneui/base';
import QRCode from 'react-native-qrcode-svg';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

export default function QRCodeReader({ closeOverlay }: { closeOverlay: () => void }) {
  const auth = getAuth();

  const [isReader, setIsReader] = useState<boolean>(true);
  const [hasPermission, setHaspermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<string>('');

  const [[name, avatar], setUser] = useState(['', '']);


  useEffect(() => {
    const getBarCodeScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHaspermission(status === 'granted');
    };

    getBarCodeScannerPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
    if (type !== 'org.iso.QRCode') {
      Alert.alert('さぽえものQRコードではありません');
      return;
    }
    if (data === '') {
      return;
    }


    setScanned(data);
    const token = await auth.currentUser?.getIdToken();
    axios.get(`http://27.133.132.254/user?uid=${data}`, {
      headers: { 'Authorization': token },
    }).then((result) => {
      setUser([result.data.name, result.data.avatar]);
    }).catch((error) => {
      Alert.alert('存在しないユーザーです')
    });
  };


  const applyScanned = async () => {
    console.log(scanned);
    return;
    const token = await auth.currentUser?.getIdToken();
    await axios.post('http://27.133.132.254/friend', {
      'friend_uid': scanned,
    }, {
      headers: { 'Authorization': token }
    });

    closeOverlay();
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
        <View style={styles.qrContainer}>
          {isReader ?
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            /> :
            <QRCode
              value={auth.currentUser?.uid}
              logo={auth.currentUser?.photoURL ?? require('../../../assets/default_logo_for_qr.png')}
              size={280}
              logoSize={140}
              logoBorderRadius={80}
              ecl="H"
            />
          }
          <Button
            title={isReader ? 'じぶんのQRコード' : 'よみとる'}
            type={'outline'}
            buttonStyle={styles.myButton}
            onPress={() => { setIsReader(!isReader); }}
          />
        </View>
      ) : (
        <View style={{ width: '100%', height: '100%' }}>
          <View style={{ width: '100%', height: '80%', }}>
            <Text>{name}</Text>
            <Image source={{ uri: avatar }} style={{ width: '80%', paddingTop: '80%' }} />
          </View>
          <View style={styles.addFriendContainer}>
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
    width: '100%',
    height: '90%',
    padding: '10%'
  },
  qrContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '10%'
  },
  addFriendContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scanner: {
    width: '80%',
    // height: '80%',
    paddingTop: '80%',
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

