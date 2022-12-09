import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import CardsFolder from '../components/CardsFolder';
import { FSCard } from '../services/FileSystem';

const ini_cards: card_detail[] = [];
const ini_func = async (modifyType: string, id?: number, title?: string, picture?: string): Promise<string> => { return '' };
const fs = new FSCard();
const CardContext = createContext({ cards: ini_cards, modifyCard: ini_func });

export const useCard = () => {
  return useContext(CardContext);
}

export const CardProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cards, setCards] = useState<card_detail[]>([]);

  useEffect(() => {
    const f = async () => {
      const _card = await fs.getData<card_detail>();
      setCards(_card)
    };
    f();
  }, []);

  const reloadCards = async (cs?: card_detail[]): Promise<void> => {
    if (typeof cs == 'undefined') {
      const reloadCards = await fs.getData<card_detail>();
      setCards(reloadCards)
      console.log('reloaded cards!')
    } else {
      await fs.updateData(cs);
      setCards(cs);
      console.log('update data!')
    }
  };

  const modifyCard = async (modifyType: string, id?: number, title?: string, picture?: string): Promise<string> => {
    var ans = '';
    if (modifyType == 'upload' && typeof title != 'undefined' && typeof picture != 'undefined') {
      const new_picture_path = await fs.savePicture(picture, title);
      ans = new_picture_path;
    }
    else if (modifyType == 'delete' && typeof id != 'undefined') {
      await fs.deleteData(id);
    }
    else if (modifyType == 'edit' && typeof id != 'undefined' && typeof title != 'undefined') {
      await fs.modifyData(id, { 'name': title });
    } else {
      ans = 'false';
    }

    const reloadCards = await fs.getData<card_detail>();
    setCards(reloadCards);

    return ans;
  }

  return (
    <CardContext.Provider value={{ cards, modifyCard }}>
      {children}
    </CardContext.Provider>
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