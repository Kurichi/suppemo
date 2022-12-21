import { Button } from '@rneui/base';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../contexts/auth';
import { registerForPushNotificationsAsync } from '../services/notification';


export default function Login(props: any) {
  const { navigation, chat } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user } = useAuth();

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password).then(async (result) => {
      // if (auth.currentUser !== null)
      //   await updateProfile(auth.currentUser, {
      //     displayName: "くりち",
      //     photoURL: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/81/chestnut_1f330.png",
      //   });
      const pushToken = await registerForPushNotificationsAsync();

      axios.post('http://27.133.132.254', {
        name: 'test',
        push_token: pushToken,
      }, {
        headers: {
          'Authorization': await user?.getIdToken(),
        }
      }).then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
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
      }
      Alert.alert('ログインに失敗しました');
    });

    // navigate to home
    if (navigation !== null)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tab' }]
      });
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder='メールアドレス'
          value={email}
          style={styles.loginForm}
          autoComplete="email"
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <TextInput
          placeholder='パスワード'
          value={password}
          style={styles.loginForm}
          autoComplete="password"
          textContentType='password'
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
      </View>

      <View style={styles.loginContainer}>
        <Button
          style={styles.loginButton}
          type="clear"
          onPress={login}>
          <Text style={styles.loginButtonText}>ログイン</Text>
        </Button>
      </View>

      {!chat && <View style={styles.loginContainer}>
        <Button
          style={styles.loginButton}
          type="clear"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab' }],
            });
          }}>
          <Text style={styles.guest}>あとでログイン</Text>
        </Button>
      </View>}

      <Button
        type="clear"
        onPress={() => {
          Alert.alert('長押ししてね');
        }}
        onLongPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp' }]
          });
        }}>
        <Text style={styles.signupMessage}>登録はこちら</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    fontSize: 32,
    color: '#C1C1C1',
    width: 316,
    paddingTop: 40,
    borderBottomWidth: 1,
  },
  loginButton: {
    width: 212,
    height: 67,
    backgroundColor: '#FCD12C',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 32,
    color: 'rgba(0,0,0,0.7)',
  },
  signupMessage: {
    fontSize: 18,
    color: '#787777',
    paddingTop: 16,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  guest: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.4)'
  },
});