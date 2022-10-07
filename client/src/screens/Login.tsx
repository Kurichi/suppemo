import { Button } from '@rneui/base';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function Login(props: any) {
  const { navigation } = props;
  const [ID, setID] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <View style={styles.container} >
      <View>
        <TextInput
          placeholder='ID'
          value={ID}
          style={styles.loginForm}
          autoComplete="username"
          onChangeText={(value) => {
            setID(value);
          }}
        />
        <TextInput
          placeholder='パスワード'
          value={password}
          style={styles.loginForm}
          autoComplete="password"
          textContentType='password'
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.loginButton}>
          <Button type="clear"
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Tab' }],
              });
            }}>
            <Text style={styles.loginButtonText}>ログイン</Text>
          </Button>
        </View>
        <Button type="clear"
          onLongPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignUp' }]
            });
          }}>
          <Text style={styles.signupMessage}>登録はこちら</Text>
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
    paddingTop: 60,
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