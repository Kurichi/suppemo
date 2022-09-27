import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';

const stack = createStackNavigator();

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <Button onPress={console.log('test')} title="Home">
          <Feather name="grid" size={42} color="black" />
        </Button>
      </View>
      <View style={styles.footerContent}>
        <Feather name="message-square" size={42} color="black" />
      </View>
      <View style={styles.footerContent}>
        <Feather name="smile" size={42} color="black" />
      </View>
      <View style={styles.footerContent}>
        <Feather name="image" size={42} color="black" />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#FCD12C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '12%',
    position: 'absolute',
    bottom: 0,
  },
  footerContent: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
    backgroundColor: 'rgba(130,41,45,0.4)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }

});