import React, { useState, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';
import { FSChat } from '../services/FileSystem';
import { useAuth } from './auth';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-screen-orientation';
import useSWR from 'swr';
import axios from 'axios';
import { UserInterfaceIdiom } from 'expo-constants';
import { IMessage } from 'react-native-gifted-chat';

const ini_talks: talk[] = [];
const ini_func = async (message: IMessage): Promise<void> => { };
const fs = new FSChat();
const ChatContext = createContext({ talks: ini_talks, sendMessage: ini_func });

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const host = '27.133.132.254';
  const [talks, setTalks] = useState<talk[]>([]);
  const { user } = useAuth();

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
      const _talks = await fs.readData<talk>();
      setTalks(_talks)
    })();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
      console.log(notification);
      const token = await user?.getIdToken();
      console.log(token);
      axios.get(`http://${host}/chat?id=0`, {
        headers: {
          'Authorization': token
        }
      }).then((result) => {
        setTalks(result.data);
        console.log(result.data);
      }).catch((error) => {
        console.log(error)
      });
      // const { data, error } = useSWR('/chat/', fetcher)
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });


    return () => {
      if (typeof notificationListener.current !== 'undefined')
        Notifications.removeNotificationSubscription(notificationListener.current);
      if (typeof responseListener.current !== 'undefined')
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    axios.get(`http://${host}/friend`).then((result) => {
      const friends = result.data?.friends;
      console.log(friends);
    }).catch((error) => {
      console.log(error);
    });
  }, [user])

  useEffect(() => {
    axios.get(`http://${host}/friend`).then((result) => {
      const friends = result.data?.friends;
      console.log(friends);
    }).catch((error) => {
      console.log(error);
    });
  }, [user])

  const sendMessage = async (message?: IMessage): Promise<void> => {
    if (typeof message === 'undefined') {

    }
    else {
      const user = useAuth();
    }
  }

  return (
    <ChatContext.Provider value={{ talks, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export function getCards(cards: card_detail[], ids: number): card_detail | null;
export function getCards(cards: card_detail[], ids: number[]): card_detail[];
export function getCards(cards: card_detail[], ids: number | number[]) {
  if (typeof ids == 'number') {
    const index = fs.getIndex(cards, ids);
    return index != -1 ? cards[index] : null;
  }
  else {
    var res: card_detail[] = [];
    for (let id of ids) {
      const index = fs.getIndex(cards, id)
      res.push(cards[index]);
    }
    return res;
  }
}