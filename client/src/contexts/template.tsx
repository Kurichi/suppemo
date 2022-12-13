import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { FSTemplate } from '../services/FileSystem';

const init_template: template_cards[] = [];
const init_func = (modifyType: string, id?: number, data?: number | string) => { };
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

  const modifyTemplate = async (modifyType: string, id?: number, data?: number | String): Promise<void> => {
    if (modifyType == 'add_empty') {
      await fs.addEmpty();
    }
    else if (modifyType == 'add_card' && typeof id != 'undefined' && typeof data == 'number') {
      const card_id = data;
      const card_ids = (await fs.getData<template_cards>(id)).item_ids;
      const index = -1;
      for (var i = 0; i < card_ids.length; i++) {
        if (card_ids[i] == -1) {
          card_ids[i] = card_id;
          break;
        }
      }

      await fs.modifyData(id, { 'item_ids': card_ids });
    }
    else if (modifyType == 'exit_card' && typeof id != 'undefined' && typeof data == 'number') {
      const i = data;
      const card_ids = (await fs.getData<template_cards>(id)).item_ids;
      const len = card_ids.length - 1;

      for (var j = i; j < len; j++) card_ids[j] = card_ids[j + 1];
      card_ids[len] = -1;

      await fs.modifyData(id, { 'item_ids': card_ids });
    } else if (modifyType == 'rename' && typeof id != 'undefined' && typeof data == 'string') {
      await fs.modifyData(id, { name: data });
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