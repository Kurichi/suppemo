import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { useAuth } from '../contexts/auth';
import MyOverlay from '../components/MyOverlay';

//import { EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updateProfile } from 'firebase/auth';

import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { deleteAllCards } from '../contexts/card';
import { deleteAllTemplates } from '../contexts/template';


export default function Settings() {
  const { user } = useAuth();
  const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false);

  // const [photoURL, setPhotoURL] = useState<string>(user && user.photoURL ? user.photoURL : '');
  // const [nameModalVisible, setNameModalVisible] = useState<boolean>(false);
  // const [userName, setUserName] = useState<string>(user && user.displayName ? user.displayName : 'ななし');
  // const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>(user && user.email ? user.email : 'nanashi@wakanne.com');

  const [imageURI, setImageUri] = useState<string>('');
  const [nameModalVisible, setNameModalVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user?.displayName ?? '');
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user?.email ?? '');

  const deleteAll = async () => {
    await deleteAllCards();
    await deleteAllTemplates();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: false,
      exif: false,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userItemContainer}>
        <View style={styles.iconBox}>
          <Image
            source={{ uri: getAuth().currentUser?.photoURL }}
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
          title='カードデータの削除'
          onPress={deleteAll}
        />
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
        onPress={async () => {
          const storage = getStorage();
          const imageRef = ref(storage, `avatar/${user?.uid}`);

          const image = await fetch(imageURI);
          const blob = await image.blob();
          const uploadTask = uploadBytesResumable(imageRef, blob);

          uploadTask.on('state_changed',
            () => { },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors

              console.log(error);
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            },
            () => {
              console.log('complete upload');
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                updateProfile(getAuth().currentUser, {
                  photoURL: downloadURL,
                })
                console.log(user?.photoURL);
              });
              setPhotoModalVisible(!photoModalVisible);
            })
        }}
      >
        {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
        <Button
          title='Pick an image'
          onPress={pickImage}>
        </Button>
      </MyOverlay>

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
                  if (auth.currentUser !== null && user != null && user?.email !== email, auth.currentUser?.email) {
                    const crediental = await EmailAuthProvider.credential(
                      auth.currentUser.email,
                      "password"
                    );
                    reauthenticateWithCredential(auth.currentUser, crediental).then(() => {
                      auth.currentUser ? updateEmail(auth.currentUser, email) : void 0;
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
    // padding: 20,
    borderRadius: 1000,
  },
  iconImage: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
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