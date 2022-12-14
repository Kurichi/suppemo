import React, { useState, PropsWithChildren, createContext, useContext, useEffect, useRef } from 'react';
import { FSChat } from '../services/FileSystem';
import { useAuth } from './auth';

const ini_talks: talk[] = [];
const ini_func = async (message: Message): Promise<void> => { };
const fs = new FSChat();
const ChatContext = createContext({ talks: ini_talks, sendMessage: ini_func });

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const host = '27.133.152.161';
  const [talks, setTalks] = useState<talk[]>([]);
  const webSocketRef = useRef<WebSocket>();

  useEffect(() => {
    const f = async () => {
      const _talks = await fs.readData<talk>();
      setTalks(_talks)
    };
    f();

    const socket = new WebSocket(`ws://${host}`);
    webSocketRef.current = socket;

    socket.addEventListener('message', event => {
      console.log(event.data);
    });

    socket.addEventListener('error', event => {
      console.log(event);
    });

    return () => socket.close();
  }, []);

  const sendMessage = async (message?: Message): Promise<void> => {
    if (typeof message === 'undefined') {

    }
    else {
      const user = useAuth();
      webSocketRef.current?.send({
        author: user,
        message: message,
      }.toString())
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