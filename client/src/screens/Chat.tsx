import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
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
    console.log(messages);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
