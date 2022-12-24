import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import TListView from '../components/TListView';

type props = BottomTabScreenProps<NavigationProps, 'TemplateList'>

export default function TemplateList({ navigation, route }: props) {

  const GoHome = (index: number) => {
    navigation.navigate('Home', { init_WS_index: index })
  }

  return (
    <TListView
      viewShot={undefined}
      onPress={GoHome}
    />

  )
}

const styles = StyleSheet.create({

});