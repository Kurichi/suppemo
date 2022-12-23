import React, { useState, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-screen-orientation';
import axios from 'axios';
import { IMessage, User } from 'react-native-gifted-chat';
import { getAuth } from 'firebase/auth';

const ini_talk: Map<string, Talk> = new Map();
const ini_func = async (to: string, message: IMessage[]): Promise<void> => { };
const ChatContext = createContext({ talks: ini_talk, sendMessage: ini_func });

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = getAuth();
  const host = 'http://27.133.132.254';
  const [talks, setTalks] = useState<Map<string, Talk>>(new Map());

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
    const unsubscribed = auth.onAuthStateChanged((user) => {
      user?.getIdToken().then((token) => {
        axios.get(`${host}/friend`, {
          headers: { 'Authorization': token }
        }).then((result) => {
          result.data.map((friend: User): void => {
            setTalks(new Map(talks.set(friend._id as string, {
              talk_with: friend,
              messages: [],
            })));
          });
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    });

    return () => unsubscribed();
  }, []);

  useEffect(() => {
    console.log('talks 更新');
  }, [talks]);

  const sendMessage = async (to: string, messages: IMessage[]): Promise<void> => {
    if (messages.length === 0) return;

    setTalks(new Map(talks.set(to, {
      talk_with: talks.get(to)?.talk_with,
      messages: talks.get(to)?.messages.concat(messages) ?? [],
    })));

    const token = auth.currentUser?.getIdToken();
    axios.post(`${host}/chat`, {
      to: to,
      text: messages[0].text,
    }, {
      headers: { 'Authorization': token && '' }
    });
  }

  return (
    <ChatContext.Provider value={{ talks, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}
