import { Button, Overlay } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View, _Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "../../contexts/auth";
import { useChat } from "../../contexts/chat";
import Login from "../Login";
import { User } from "react-native-gifted-chat";
import QRCodeReader from "./QRCodeReader";

type props = StackScreenProps<NavigationProps, 'ChatSelector'>

export default function ChatSelector({ navigation, route }: props) {
  const { user } = useAuth();
  const { talks } = useChat();
  const [QRCodeVisible, setQRCodeVisible] = useState<boolean>(false);

  if (user == null) {
    Alert.alert(
      'ログインしてね',
      'チャットをするには\nログインがひつようだよ',
    );
    return (
      <Login chat={true} />
    );
  }

  return (
    <View style={styles.container}>
      {user == null ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            ログインしていないよ
          </Text>
        </View>
      ) : (
        <ScrollView>
          {[...talks].map(([_id, { talk_with }]) => {
            return (
              <View style={styles.chatCard} key={_id}>
                <Button
                  title={talk_with.name !== '' ? talk_with.name : 'No name'}
                  titleStyle={{
                    color: 'black',
                    textAlign: 'left',
                    flex: 10,
                  }}
                  type='clear'
                  icon={
                    talk_with.avatar &&
                    <Image
                      source={{ uri: talk_with.avatar }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        backgroundColor: 'white',
                        marginRight: 10,
                      }} />
                  }
                  onPress={() => {
                    navigation.navigate('Chat', { '_id': _id });
                  }}
                />
              </View>
            );
          })}
          {/* <View style={styles.chatCard}>
            <Button
              title='メモ'
              titleStyle={{
                color: 'black',
                textAlign: 'left',
                flex: 10,
              }}
              type='clear'
              icon={{
                name: 'home',
                type: 'font-awesome',
                color: 'black',
                iconStyle: { marginHorizontal: 10, flex: 1 }
              }}
              onPress={() => {
                navigation.navigate('Chat', { 'talk': memo });
              }}
            />
          </View> */}
        </ScrollView>
      )
      }

      <View style={styles.userPlus}>
        <Button
          type='clear'
          icon={{
            name: 'user-plus',
            type: 'font-awesome',
            color: 'black',
            size: 32,
          }}
          onPress={() => {
            setQRCodeVisible(true);
            // navigation.navigate('reader', {});
          }}
        />
      </View>
      <Overlay
        isVisible={QRCodeVisible}
        onBackdropPress={() => { setQRCodeVisible(false); }}
        overlayStyle={styles.overlayStyle}
      >
        <QRCodeReader
          closeOverlay={() => { setQRCodeVisible(false); }} />
      </Overlay>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8B0',
    flex: 1,
  },
  chatCard: {
    flex: 1,
    // paddingHorizontal: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  userPlus: {
    position: 'absolute',
    width: 72,
    height: 72,
    bottom: 32,
    right: 16,
    backgroundColor: '#FCD12C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  overlayStyle: {
    height: 400,
    width: '90%',
    backgroundColor: '#FCD12C',
  }

});