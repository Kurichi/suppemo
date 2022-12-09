import { Button } from '@rneui/base';
import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

interface User {
  _id: number,
  name: string,
  avatar: string
}
interface Message {
  _id: number,
  text: string,
  createdAt: Date,
  user: User,
}

export default function Chat(props: any) {
  const { navigation, route } = props;
  const { user } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: user.userName,
    });
    console.log(user.userName);
  }, [navigation, user]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [])

  const onSend = useCallback((messages: Message[] = []) => {
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
