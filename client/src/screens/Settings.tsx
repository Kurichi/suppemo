import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Overlay } from '@rneui/base';
import { useAuth } from '../contexts/auth';
import { TextInput } from 'react-native-gesture-handler';

export default function Settings() {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>();
  const { user } = useAuth();
  const s = require('../../assets/default_logo.png');
  return (
    <View style={styles.container}>
      <View style={styles.userItemContainer}>
        <View style={styles.iconBox}>
          <Image
            source={{ uri: user ? user.photoURL : '' }}
            style={styles.iconImage}
          />
        </View>

        <Text
          style={styles.userName}
        >{user ? user.displayName : 'ゲスト'}</Text>

      </View>
      <View style={styles.userSettingsContainer}>
        <Button
          title='アイコン画像の変更'
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
        />
        <Button
          title='名前の変更'
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
          onPress={() => { setModalVisible(true); }}
        />
        <Button
          title='メールアドレスの変更'
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
        />
      </View>
      <View style={[styles.userSettingsContainer, { position: 'absolute', bottom: 50 }]}>
        <Button
          title='アカウントの削除'
          buttonStyle={[styles.setteingItemButton, {
            backgroundColor: 'red',
          }]}
          titleStyle={styles.setteingItemButtonText}
          delayLongPress={3000}
          onPress={() => {
            Alert.alert('長押ししてください')
          }}
          onLongPress={() => {
            Alert.alert(
              'アカウントの削除',
              'アカウントを消すと二度と元には戻せません。\n 本当に消しますか？',
              [
                { text: 'はい', },
                { text: 'やっぱりやめます' }
              ]
            )
          }}
        />
      </View>
      <Overlay
        overlayStyle={{
          backgroundColor: 'white'
        }}
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(!modalVisible) }}>
        <View >
          <Text>なまえを変更する</Text>
          <TextInput
            value={user?.displayName}
            onChangeText={(value) => {
            }}
          />
          <Button></Button>
        </View>
      </Overlay>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    alignItems: 'center',
  },
  userName: {
    fontSize: 30,

  },
  userItemContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 1000,
  },
  iconImage: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSettingsContainer: {
    marginTop: 30,
    width: '94%',
    backgroundColor: "#red",

  },
  setteingItemButton: {
    fontSize: 10,
    borderColor: "##434343",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  setteingItemButtonText: {
    fontSize: 30,
    color: "black",
  },



});