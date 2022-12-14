import { Button, Icon } from "@rneui/base";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useChat } from "../contexts/chat";

export default function ChatSelector(props: any) {
  const { navigation, route } = props;
  const { stack } = route.params;
  const { talks } = useChat();
  // const [users, setUsers] = useState<User[]>();
  const users: User[] = [
    { _id: 0, avatar: 'tmp', name: 'なまえ0' },
    { _id: 1, avatar: 'tmp', name: 'なまえ1' },
    { _id: 2, avatar: 'tmp', name: 'なまえ2' },
    { _id: 3, avatar: 'tmp', name: 'なまえ3' },
    { _id: 4, avatar: 'tmp', name: 'なまえ4' },
    { _id: 5, avatar: 'tmp', name: 'なまえ5' }
  ];

  return (
    <View>
      <ScrollView>
        {talks?.map((talk, index) => {
          return (
            <View style={styles.chatCard} key={index}>
              <Button
                title={talk.talk_with.name}
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
                  stack.navigate('Chat', { 'talk': talk });
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