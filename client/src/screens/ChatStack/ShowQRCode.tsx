import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../contexts/auth';
import { Image } from '@rneui/base';
import { StackScreenProps } from '@react-navigation/stack';

type props = StackScreenProps<NavigationProps, "show">;

export default function ShowQRCode({ navigation, route }: props) {

  const { user } = useAuth();
  const logo = user?.photoURL;
  const { uri, height, width } = route.params;

  return (
    <View style={styles.container}>
      <QRCode
        value={user?.uid}
        logo={logo ? logo : require('../../../assets/default_logo_for_qr.png')}
        size={320}
        logoSize={120}
        ecl="H"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    alignItems: 'center',
    justifyContent: 'center',
  }
});