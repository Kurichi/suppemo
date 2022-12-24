import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { FSCard } from '../services/FileSystem';

const ini_cards: card_detail[] = [];
const ini_func = async (modifyType: card_modify_type, modifyData: card_modify_props): Promise<string> => { return '' };
const fs = new FSCard();
const CardContext = createContext({ cards: ini_cards, modifyCard: ini_func });

export const useCard = () => {
  return useContext(CardContext);
}

export const CardProvider = ({ children }: PropsWithChildren<{}>) => {

  const [cards, setCards] = useState<card_detail[]>([]);

  useEffect(() => {
    const f = async () => {
      const _card = await fs.readData<card_detail>();
      setCards(_card)
    };
    f();
  }, []);

  const modifyCard = async (modifyType: card_modify_type, { id, title, picture }: card_modify_props): Promise<string> => {
    var ans = '';
    if (modifyType == 'upload' && typeof title != 'undefined' && typeof picture != 'undefined') {
      const new_picture_path = await fs.savePicture(picture, title);
      ans = new_picture_path;
    }
    else if (modifyType == 'delete' && typeof id != 'undefined' && id >= 0) {
      await fs.deleteData(id);
    }
    else if (modifyType == 'edit' && typeof id != 'undefined' && typeof title != 'undefined') {
      await fs.modifyData(id, { 'name': title });
    }

    const reloadCards = await fs.readData<card_detail>();
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
      if (index != -1 && cards[index].exists)
        res.push(cards[index]);
    }
    return res;
  }
}

export function getDeletedCards(cards: card_detail[]) {
  var res: number[] = [];

  for (var card of cards) {
    if (!card.exists) res.push(card.id)
  }

  return res;
}

export function deleteAll() {
  fs._deleteAll();
}