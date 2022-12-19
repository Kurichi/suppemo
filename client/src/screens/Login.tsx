import { Button } from '@rneui/base';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../contexts/auth';
import { registerForPushNotificationsAsync } from '../services/notification';


export default function Login(props: any) {
  const { navigation } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user } = useAuth();

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password).then(async (result) => {
      const pushToken = await registerForPushNotificationsAsync()
      if (pushToken != null) {
        const result = await axios.post('http://27.133.132.254', {
          name: 'test',
          push_token: pushToken,
        }, {
          headers: { 'Authorization': await user?.getIdToken() }
        });
        console.log(result);
      }

      // navigate to home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tab' }]
      });
    }).catch((error) => {
      console.log(error)
    });

    axios.post('http://27.133.132.254/init', {}, {
      headers: { 'Authorization': await user?.getIdToken() }
    }).then((result) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    login();
  }, [user]);

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
        <View style={styles.loginButton}>
          <Button type="clear"
            onPress={login}>
            <Text style={styles.loginButtonText}>ログイン</Text>
          </Button>
        </View>
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

        {/* debug by yammer */}
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tab' }],
            });
          }}
        >
          <Text>debug</Text>
        </Button>
      </View>
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
    color: 'rgba(0,0,0,0.4)',
  },
  signupMessage: {
    fontSize: 13,
    color: '#787777',
    paddingTop: 16,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },

});