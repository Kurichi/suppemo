import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import CardsFolder from '../components/CardsFolder';
import { FSCard } from '../services/FileSystem';

const ini_cards: card_detail[] = [];
const ini_func = () => { };
const fs = new FSCard();
const CardContext = createContext({ cards: ini_cards, reloadCards: ini_func });

export const useCard = () => {
  return useContext(CardContext);
}

export const CardProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cards, setCards] = useState<card_detail[]>([]);

  useEffect(() => {
    const f = async () => {
      const _card = await fs.getCardData();
      setCards(_card)
    };
    f();
  }, []);

  const reloadCards = async (): Promise<void> => {
    const reloadCards = await fs.getCardData();
    setCards(reloadCards)
    console.log('reloaded!')
  };

  return (
    <CardContext.Provider value={{ cards, reloadCards }}>
      {children}
    </CardContext.Provider>
  )
}

export const uploadCard = async (picture: string, title: string) => {
  const new_picture_path = await fs.savePicture(picture, title);
  return new_picture_path;
}