import React, { useState } from 'react';
import Navigator from './src/components/Navigator';
import { CardProvider } from './src/contexts/card'

export default function App() {
  return (
    <CardProvider>
      <Navigator />
    </CardProvider>
  );
}
