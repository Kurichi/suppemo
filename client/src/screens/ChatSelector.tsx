import { Button, Icon } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface User {
  id: number,
  icon: string,
  userName: string,
}

export default function ChatSelector(props: any) {
  const { navigation, route } = props;
  const { stack } = route.params;
  // const [users, setUsers] = useState<User[]>();
  const users: User[] = [
    { id: 0, icon: 'tmp', userName: 'なまえ0' },
    { id: 1, icon: 'tmp', userName: 'なまえ1' },
    { id: 2, icon: 'tmp', userName: 'なまえ2' },
    { id: 3, icon: 'tmp', userName: 'なまえ3' },
    { id: 4, icon: 'tmp', userName: 'なまえ4' },
    { id: 5, icon: 'tmp', userName: 'なまえ5' }
  ];

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  chatCard: {
    flex: 1,
    // paddingHorizontal: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  }

});