import React, { useState, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-screen-orientation';
import axios from 'axios';
import { IMessage, User } from 'react-native-gifted-chat';
import { getAuth } from 'firebase/auth';

const ini_talk: Talk[] = []
const ini_func = async (to: string, message: IMessage[]): Promise<void> => { };
const ChatContext = createContext({ talks: ini_talk, sendMessage: ini_func });

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = getAuth();
  const host = 'http://27.133.132.254';
  const [talks, setTalks] = useState<Talk[]>([]);

  const notificationListener = useRef<Subscription>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
      const token = await auth?.currentUser?.getIdToken();

      // axios.get(`http://${host}/chat?id=0`, {
      //   headers: {
      //     'Authorization': token
      //   }
      // }).then((result) => {
      //   setTalks(result.data);
      //   console.log(result.data);
      // }).catch((error) => {
      //   console.log(error)
      // });
    });

    return () => {
      if (typeof notificationListener.current !== 'undefined')
        Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  // フレンド一覧を取得
  useEffect(() => {
    auth.currentUser?.getIdToken().then((token) => {
      axios.get(`${host}/friend`, {
        headers: { 'Authorization': token }
      }).then((result) => {
        console.log(result.data);
        setTalks(result.data.map((friend: User): Talk => {
          return (
            {
              talk_with: friend,
              messages: [],
            }
          );
        }));
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }, [auth.currentUser])


  const sendMessage = async (to: string, messages: IMessage[]): Promise<void> => {
    if (messages.length === 0) return;

    const token = await auth.currentUser?.getIdToken();
    if (typeof token === 'undefined') return;

    console.log(talks.map((value) => {
      if (value.talk_with._uid !== to) return value;
      return ({
        talk_with: value.talk_with,
        messages: value.messages.concat(messages),
      });
    }));

    axios.post(`${host}/chat`, {
      to: to,
      messages: messages,
    }, {
      headers: { 'Authorization': token }
    });
  }

  return (
    <ChatContext.Provider value={{ talks, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}
