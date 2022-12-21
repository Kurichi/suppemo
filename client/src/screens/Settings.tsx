import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.userItemContainer}>
        <View style={styles.iconImage}></View>


        <Text>名前</Text>

      </View>
      <View style={styles.userSettingsContainer}>
        <Button
          title={'アイコン画像の編集'}
          buttonStyle={styles.setteingItemButton}
          titleStyle={styles.setteingItemButtonText}
        />
        <Button
          title={'名前の設定'}
          buttonStyle={styles.setteingItemButton}
        />
        <Button
          title={'メールアドレスの設定'}
          buttonStyle={styles.setteingItemButton}
        />
        <Button
          title={'アカウントの削除'}
          buttonStyle={styles.setteingItemButton}
        />





        {/* <Text style={styles.}>アイコン画像の編集</Text>
      <Text>名前の設定</Text>
      <Text>メールアドレスの設定</Text>
      <Text>アカウントの削除</Text> */}

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userItemContainer: {


  },
  iconImage: {
    height: 50,
    width: 50,
    backgroundColor: "#623fcc",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSettingsContainer: {
    width: '94%',
    backgroundColor: "#red",

  },
  setteingItemButton: {
    fontSize: 10,
    borderColor: "##434343",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
  },
  setteingItemButtonText: {
    fontSize: 30,
    color: "black"
  },



});