import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import { Feather } from '@expo/vector-icons';

export default function Footer(props: any) {
  const { navigation } = props;

  function navigate(route: string) {
    console.log(navigation.getState());
    // if (route == navigation.getState().slice(-1)[0]) {
    //   return;
    // }
    // console.log('test');
    navigation.navigate(route);
    // navigation.replace(route)
  }
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <Button type="clear"
          onPress={() => navigate('Home')}>
          <Feather name="grid" size={42} color="black" />
        </Button>
      </View>
      <View style={styles.footerContent}>
        <Button type="clear"
          onPress={() => navigation.navigate('Chat')}>
          <Feather name="message-square" size={42} color="black" />
        </Button>
      </View>
      <View style={styles.footerContent}>
        <Button type="clear">
          <Feather name="smile" size={42} color="black" />
        </Button>
      </View>
      <View style={styles.footerContent}>
        <Button type="clear"
          onPress={() => navigate('Camera')}>
          <Feather name="image" size={42} color="black" />
        </Button>
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