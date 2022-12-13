import { Button } from '@rneui/base';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function SignUp(props: any) {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container} >
      <View>
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
            onPress={() => {
              createUserWithEmailAndPassword(auth, email, password).then((result) => {
                console.log(result);
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Tab' }],
                });
              }).catch((error) => {
                console.log(error.message);
              });
            }}>
            <Text style={styles.signupButtonText}>とうろく</Text>
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