import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { useAuth } from '../contexts/auth';
import MyOverlay from '../components/MyOverlay';
import { EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updateProfile } from 'firebase/auth';

export default function Settings() {
  const { user } = useAuth();
  const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL);
  const [nameModalVisible, setNameModalVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user?.displayName);
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user?.email);

  const s = require('../../assets/default_logo_for_qr.png');
  return (
    <View style={styles.container}>
      <View style={styles.userItemContainer}>
        <View style={styles.iconBox}>
          <Image
            source={{ uri: user && user.photoURL ? user.photoURL : '' }}
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
          onPress={() => { setPhotoModalVisible(true) }}
        />
        <Button
          title='名前の変更'
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
          onPress={() => { setNameModalVisible(true); }}
        />
        <Button
          title='メールアドレスの変更'
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
          onPress={() => { setEmailModalVisible(true); }}
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

      <MyOverlay
        title='画像の変更'
        isVisible={photoModalVisible}
        onBackdropPress={() => { setPhotoModalVisible(!photoModalVisible); }}
        children={<Text>childrenを与えるとそれが，与えなければTextInput</Text>}
      />


      <MyOverlay
        title='名前の変更'
        currentValue={userName}
        isVisible={nameModalVisible}
        onChangeText={(value) => { setUserName(value); }}
        onBackdropPress={() => { setNameModalVisible(!nameModalVisible); }}
        onPress={() => {
          Alert.alert(
            '名前を変更しますか？',
            '',
            [
              {
                text: '変更', onPress: async (value) => {
                  const auth = getAuth();
                  if (auth.currentUser !== null && user?.displayName !== userName)
                    await updateProfile(auth.currentUser, {
                      displayName: userName,
                    });
                  setNameModalVisible(!nameModalVisible);
                }
              },
              { text: 'キャンセル' }
            ]
          )
        }}
      />

      <MyOverlay
        title='メールアドレスの変更'
        currentValue={email}
        isVisible={emailModalVisible}
        onChangeText={(value) => { setEmail(value); }}
        onBackdropPress={() => { setEmailModalVisible(!emailModalVisible); }}
        onPress={() => {
          Alert.alert(
            'メールアドレスを変更しますか？',
            '',
            [
              {
                text: '変更', onPress: async () => {
                  const auth = getAuth();
                  if (auth.currentUser !== null && user != null && user?.email !== email) {
                    const crediental = await EmailAuthProvider.credential(
                      auth.currentUser.email,
                      "password"
                    );
                    reauthenticateWithCredential(auth.currentUser, crediental).then(() => {
                      updateEmail(auth.currentUser, email);
                    });
                  }
                  setEmailModalVisible(!emailModalVisible);
                }
              },
              { text: 'キャンセル' }
            ]
          )
        }}
      />
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