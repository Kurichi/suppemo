import React, { useState, PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { FSTemplate } from '../services/FileSystem';

const init_template: template_cards[] = [];
const init_func = () => { };
const fs = new FSTemplate();
const TemplateContext = createContext({ templates: init_template, reloadTemplates: init_func })

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

  return (
    <TemplateContext.Provider value={{ templates, reloadTemplates }}>
      {children}
    </TemplateContext.Provider>
  )
}