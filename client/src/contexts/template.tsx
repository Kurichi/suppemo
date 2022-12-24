import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { DATE_FORMAT } from 'react-native-gifted-chat';
import { Sounder } from '../components/Sounder';
import { FSTemplate } from '../services/FileSystem';

const init_template: template_cards[] = [];
const init_func = (modifyType: string, data: template_modify_props) => { };
const fs = new FSTemplate();
const TemplateContext = createContext({ templates: init_template, modifyTemplate: init_func })

export const useTemplates = () => {
  return useContext(TemplateContext);
}

export const TemplateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [templates, setTemplates] = useState<template_cards[]>([]);

  useEffect(() => {
    const f = async () => {
      const _template = await fs.readData<template_cards>();
      setTemplates(_template)
    };
    f();
  }, []);

  const reloadTemplates = async (): Promise<void> => {
    const reloadTemplates = await fs.readData<template_cards>();
    setTemplates(reloadTemplates)
    console.log('reloaded templates!');
  };

  const modifyTemplate = async (modifyType: string, { template_id, card_id, index, title, nonexistCard_id }: template_modify_props): Promise<void> => {
    // 新規テンプレート
    if (modifyType == 'add_empty') {
      await fs.addEmpty();
    }
    // カードの追加
    else if (modifyType == 'add_card' && typeof template_id != 'undefined' && typeof card_id != 'undefined') {
      const data = await fs.readData<template_cards>(template_id);
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
        await Sounder('error', 'play');
      } else {
        card_num += 1;
        await Sounder('decision', 'play');
        await fs.modifyData(template_id, { 'item_ids': card_ids, 'item_num': card_num });
      }
    }
    // カードの削除
    else if (modifyType == 'exit_card' && template_id && index) {
      const data = await fs.readData<template_cards>(template_id);
      const card_ids = data.item_ids;
      var card_num = data.item_num - 1;
      const len = card_ids.length - 1;

      for (var j = index; j < len; j++) card_ids[j] = card_ids[j + 1];
      card_ids[len] = -1;

      await Sounder('cancel', 'play')

      await fs.modifyData(template_id, { 'item_ids': card_ids, 'item_num': card_num });
    }
    //タイトル変更
    else if (modifyType == 'edit_title' && typeof template_id != 'undefined' && typeof title != 'undefined') {
      await fs.modifyData(template_id, { 'name': title });
    }
    //テンプレートの削除
    else if (modifyType == 'delete' && typeof template_id != 'undefined') {
      await fs.deleteData(template_id);
    }
    //カードの削除(カードID指定)
    else if (modifyType == 'refresh' && typeof nonexistCard_id != 'undefined') {

      const data = await fs.readData<template_cards>();

      const search = (id: number) => {
        for (var nonid of nonexistCard_id) if (id == nonid) return false;
        return true;
      }

      for (var template of data) {
        const newIds: number[] = Array(8).fill(-1);
        var i = 0;

        for (var id of template.item_ids) {
          if (search(id)) newIds[i++] = id;
        }

        await fs.modifyData(template.id, { item_ids: newIds, item_num: i })

      }

    }

    reloadTemplates();
  }

  return (
    <TemplateContext.Provider value={{ templates, modifyTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const deleteAllTemplates = async () => {
  await fs._deleteAll();
}