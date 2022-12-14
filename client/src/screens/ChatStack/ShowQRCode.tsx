import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuthContext } from '../../contexts/auth';

export default function ShowQRCode() {

  const { user } = useAuthContext();
  const user_uid = user?.uid;

  return (
    <View>
      <QRCode
        value={user_uid}
      />
    </View>
  )
}

const styles = StyleSheet.create({

});