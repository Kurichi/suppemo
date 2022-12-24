import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@rneui/base';

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { registerForPushNotificationsAsync } from '../services/notification';

export default function SignUp(props: any) {
  const { navigation } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  return (
    <View style={styles.container} >
      <View>
        <TextInput
          placeholder='なまえ'
          value={name}
          autoComplete='name'
          style={styles.signupForm}
          onChangeText={(value) => {
            setName(value);
          }} />
        <TextInput
          placeholder='メールアドレス'
          value={email}
          autoComplete='email'
          style={styles.signupForm}
          onChangeText={(value) => {
            setEmail(value);
          }} />
        <TextInput
          placeholder='パスワード'
          value={password}
          autoComplete='password'
          style={styles.signupForm}
          onChangeText={(value) => {
            setPassword(value);
          }} />
      </View>
      <View style={styles.signupContainer}>
        <View style={styles.signupButton}>
          <Button type="clear"
            onPress={async () => {
              createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Tab' }],
                });

                sendEmailVerification(result.user);
                updateProfile(result.user, {
                  displayName: name,
                  photoURL: 'https://firebasestorage.googleapis.com/v0/b/suppemo-3aec0.appspot.com/o/avatar%2Fdefault_logo.png?alt=media&token=956be05f-0a09-467f-80f2-659948ae2531'
                });

                const pushToken = await registerForPushNotificationsAsync()

                axios.post('http://27.133.132.254', {
                  push_token: pushToken,
                }, {
                  headers: { 'Authorization': await result.user?.getIdToken() }
                });
              }).catch((error) => {
                switch (error.code) {
                  case "auth/network-request-failed":
                    Alert.alert("通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。");
                    break;
                  case "auth/weak-password":  //バリデーションでいかないようにするので、基本的にはこのコードはこない
                    Alert.alert("パスワードが短すぎます。6文字以上を入力してください。");
                    break;
                  case "auth/invalid-email":  //バリデーションでいかないようにするので、基本的にはこのコードはこない
                    Alert.alert("メールアドレスが正しくありません");
                    break;
                  case "auth/email-already-in-use":
                    Alert.alert("メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください");
                    break;
                  default:  //想定外
                    Alert.alert("アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。");
                    console.log(error.message);
                }
              });
            }}>
            <Text style={styles.signupButtonText}>とうろく</Text>
          </Button>
        </View>
        <Button
          type="clear"
          // onPress={() => {
          //   Alert.alert('長押ししてね');
          // }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            });
          }}>
          <Text style={styles.signupMessage}>登録はこちら</Text>
        </Button>
      </View>
    </View >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupForm: {
    fontSize: 32,
    color: '#C1C1C1',
    width: 316,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  signupButton: {
    width: 212,
    height: 67,
    backgroundColor: '#FCD12C',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 32,
    color: 'rgba(0,0,0,0.4)',


  },
  signupMessage: {
    fontSize: 13,
    color: '#787777',
    paddingTop: 16,
  },
  signupContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },

});