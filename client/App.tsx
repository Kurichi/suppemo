import React, { useState } from 'react';
import Navigator from './src/components/Navigator';
import { CardProvider } from './src/contexts/card'
import { TemplateProvider } from './src/contexts/template';

export default function App() {
  return (
    <CardProvider>
      <TemplateProvider>
        <Navigator />
      </TemplateProvider>
    </CardProvider>
  );
}
