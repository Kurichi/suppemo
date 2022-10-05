import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import WorkSpace from './WorkSpace';

interface wsf_props {
  name: string,
  cards: string[],
}

export default function WorkSpaceFrame(props: wsf_props) {
  const { name, cards } = props;
  return (
    <View>
      <View>
        <Text>{name}</Text>
        <Text>sound</Text>
      </View>
      <WorkSpace />
    </View>
  );
}

const styles = StyleSheet.create({

});