import { Button } from '@rneui/base';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignUp(props: any) {
  const { navigation } = props;
  return (
    <View style={styles.container} >
      <View>
        <TextInput value='なまえ' style={styles.signupForm} />
        <TextInput value="ID" style={styles.signupForm} />
        <TextInput value="ぱすわーど" style={styles.signupForm} />
      </View>
      <View style={styles.signupContainer}>
        <View style={styles.signupButton}>
          <Button type="clear"
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }}>
            <Text style={styles.signupButtonText}>SignUp</Text>
          </Button>
        </View>
        <Button type="clear"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            });
          }}>
          <Text style={styles.signupMessage}>ログインはこちら</Text>
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