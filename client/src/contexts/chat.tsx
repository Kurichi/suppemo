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
      const message = JSON.parse(notification.request.content.data.message as string);
      // console.log(talks.get(message.uid)?.talk_with);
      setTalks(new Map(talks.set(message.uid, {
        talk_with: talks.get(message.uid)?.talk_with,
        messages: talks.get(message.uid)?.messages.concat([{
          _id: -1,
          text: message.text,
          image: message.image,
          user: talks.get(message.uid)?.talk_with,
        }]),
      })));
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
          console.log(talks);
          axios.get(`${host}/chat?id=-1`, {
            headers: { 'Authorization': token }
          }).then((result) => {
            // console.log(result.data);
            result.data.map(({ talk_with, messages }: { talk_with: string, messages: any }) => {
              console.log('test')
              console.log(talk_with);
              if (talks.has(talk_with as string)) {
                setTalks(new Map(talks.set(talk_with,
                  {
                    talk_with: talks.get(talk_with)?.talk_with,
                    messages: messages.map((value: any): IMessage => {
                      if (value.user === auth.currentUser?.uid) {
                        return ({
                          _id: value._id,
                          text: value.text,
                          image: value.image,
                          createdAt: value.createdAt,
                          user: {
                            _id: value.user,
                            name: auth.currentUser?.displayName ?? '',
                            avatar: auth.currentUser?.photoURL ?? '',
                          }
                        })
                      }
                      else {
                        return ({
                          _id: value._id,
                          text: value.text,
                          image: value.image,
                          createdAt: value.createdAt,
                          user: talks.get(talk_with)?.talk_with,
                        })
                      }
                    })
                  }
                )));
              }
            })
            // console.log(talks)
          }).catch((error) => {
            console.log(error);
          })
        }).catch((error) => {
          console.log(error);
        });

      }).catch((error) => {
        console.log(error);
      });

    });

    return () => unsubscribed();
  }, []);

  const sendMessage = async (to: string, messages: IMessage[]): Promise<void> => {
    if (messages.length === 0) return;
    console.log(messages)

    setTalks(new Map(talks.set(to, {
      talk_with: talks.get(to)?.talk_with,
      messages: talks.get(to)?.messages.concat(messages) ?? [],
    })));

    const token = await auth.currentUser?.getIdToken();
    axios.post(`${host}/chat`, {
      to: to,
      text: messages[0].text,
      image: messages[0].image,
    }, {
      headers: { 'Authorization': token }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <ChatContext.Provider value={{ talks, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}
