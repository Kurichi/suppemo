import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { FSTemplate } from '../services/FileSystem';

const init_template: template_cards[] = [];
const init_func = (modifyType: string, template_id?: number, card_id_or_idx?: number) => { };
const fs = new FSTemplate();
const TemplateContext = createContext({ templates: init_template, modifyTemplate: init_func })

export const useTemplates = () => {
  return useContext(TemplateContext);
}

export const TemplateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [templates, setTemplates] = useState<template_cards[]>([]);

  useEffect(() => {
    const f = async () => {
      const _template = await fs.getData<template_cards>();
      setTemplates(_template)
    };
    f();
  }, []);

  const reloadTemplates = async (): Promise<void> => {
    const reloadTemplates = await fs.getData<template_cards>();
    setTemplates(reloadTemplates)
    console.log('reloaded templates!');
  };

  const modifyTemplate = async (modifyType: string, template_id?: number, card_id_or_idx?: number): Promise<void> => {
    // 新規テンプレート
    if (modifyType == 'add_empty') {
      await fs.addEmpty();
    }
    // カードの追加
    else if (modifyType == 'add_card' && typeof template_id != 'undefined' && typeof card_id_or_idx != 'undefined') {
      const card_id = card_id_or_idx;
      const data = await fs.getData<template_cards>(template_id);
      const card_ids = data.item_ids;
      var card_num = data.item_num;
      var flag: boolean = true;
      for (var i = 0; i < card_ids.length; i++) {
        if (card_ids[i] == -1) {
          card_ids[i] = card_id;
          flag = false;
          break;
        }
      }

      if (flag) {
        console.log('カード枚数上限')
      } else {
        card_num += 1;
        await fs.modifyData(template_id, { 'item_ids': card_ids, 'item_num': card_num });
      }
    }
    // カードの削除
    else if (modifyType == 'exit_card' && typeof template_id != 'undefined' && typeof card_id_or_idx != 'undefined') {
      const i = card_id_or_idx;
      const data = await fs.getData<template_cards>(template_id);
      const card_ids = data.item_ids;
      var card_num = data.item_num - 1;
      const len = card_ids.length - 1;

      for (var j = i; j < len; j++) card_ids[j] = card_ids[j + 1];
      card_ids[len] = -1;

      await fs.modifyData(template_id, { 'item_ids': card_ids, 'item_num': card_num });
    }

    const reloadTemplates = await fs.getData<template_cards>();
    setTemplates(reloadTemplates)
    console.log('reloaded templates!');
  }

  return (
    <TemplateContext.Provider value={{ templates, modifyTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}