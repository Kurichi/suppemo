import React, { useState, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';
import { FSChat } from '../services/FileSystem';
import { useAuth } from './auth';
import { IMessage } from 'react-native-gifted-chat';

const ini_talks: talk[] = [];
const ini_func = async (message: IMessage): Promise<void> => { };
const fs = new FSChat();
const ChatContext = createContext({ talks: ini_talks, sendMessage: ini_func });

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const host = '27.133.152.161';
  const [talks, setTalks] = useState<talk[]>([]);

  useEffect(() => {
    const f = async () => {
      const _talks = await fs.readData<talk>();
      setTalks(_talks)
    };
    f();


  }, []);

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