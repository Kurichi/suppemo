import { Icon } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface User {
  id: number,
  icon: string,
  userName: string,
}

function ChatCard(props: { user: User }) {
  const { user } = props;
  return (
    <View style={styles.chatCard}>
      {/* <Image source={require('./../../assets/corn.jpg')} /> */}
      <Icon name="home" size={42} />
      <Text>{user.userName}</Text>
    </View>
  )
}

export default function ChatSelector() {
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
        {
          users?.map(user => {
            return (
              <ChatCard user={user} />
              // <Text>{user.userName}</Text>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatCard: {
    height: 50,
    flexDirection: 'row',
    // alignContent: 'center',
  }

});