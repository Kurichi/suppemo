import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function  Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>さぽえも</Text>
        <Feather name="settings" size={24} color="white" style={styles.headerSettings}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    with: '100%',
    height: 74,
    backgroundColor: '#82292D',
    justifyContent: 'flex-end',
  },
  headerInner: {
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 32,
    lineHeight: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerSettings: {
    position: 'absolute',
    right: 19,
    bottom: 16,
  }
});