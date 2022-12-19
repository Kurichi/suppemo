import { Button, Icon } from '@rneui/base';
import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage, Send, SendProps } from 'react-native-gifted-chat';
import { useChat } from '../contexts/chat';


export default function Chat(props: any) {
  const { navigation, route } = props;
  const { talk } = route.params;
  const { sendMessage } = useChat();

  const [messages, setMessages] = useState<Message[]>([]);

  // change navigation title to friend name
  useEffect(() => {
    navigation.setOptions({
      title: talk.talk_with.userName,
    });
  }, [talk]);

  const onSend = useCallback((messages: Message[] = []) => {
    sendMessage(messages[0]);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderSend = (props: SendProps<Message>) => {
    return (
      <Send
        {...props}
        containerStyle={{
          marginRight: 16,
          justifyContent: 'center',
        }}
      >
        <Icon name='send' type='font-awesome' color='blue' size={24} />
      </Send>
    )
  }

  const renderAction = () => {
    return (
      <View
        style={{
          marginHorizontal: 8,
          marginBottom: 4,
          justifyContent: 'center',
        }}
      >
        <Icon name='cards-outline' type='material-community' color='blue' size={28} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        placeholder='メッセージを入力'
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        locale='ja'
        renderSend={renderSend}
        renderActions={renderAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  }
})
