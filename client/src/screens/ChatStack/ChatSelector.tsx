import { Button, Icon } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View, _Text } from "react-native";
import { useAuthContext } from "../../contexts/auth";

interface User {
  id: number,
  icon: string,
  userName: string,
}

export default function ChatSelector(props: any) {
  const { navigation, route } = props;
  const { stack } = route.params;
  const { user } = useAuthContext();
  // const [users, setUsers] = useState<User[]>();
  const users: User[] = [
    { id: 0, icon: 'tmp', userName: 'なまえ0' },
    { id: 1, icon: 'tmp', userName: 'なまえ1' },
    { id: 2, icon: 'tmp', userName: 'なまえ2' },
    { id: 3, icon: 'tmp', userName: 'なまえ3' },
    { id: 4, icon: 'tmp', userName: 'なまえ4' },
    { id: 5, icon: 'tmp', userName: 'なまえ5' }
  ];

  if (user == null) {
    Alert.alert(
      'ログインしてないよ',
      '',
      [
        { text: 'ログイン', onPress: () => { stack.navigate('Login') } },
        { text: 'もどる', onPress: () => { stack.navigate('Home') } }
      ]
    )
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
          {users?.map((user, index) => {
            return (
              <View style={styles.chatCard} key={index}>
                <Button
                  title={user.userName}
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
                    stack.navigate('Chat', { 'user': user });
                  }}
                />
              </View>
            )
          })}
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
          }}
          onPress={() => {
            stack.navigate('reader');
          }}
        />
      </View>
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
  }

});