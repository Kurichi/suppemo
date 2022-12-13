import React, { useState } from 'react';
import Navigator from './src/components/Navigator';
import { CardProvider } from './src/contexts/card'
import { TemplateProvider } from './src/contexts/template';
import { TestFS } from './src/services/FileSystem';
import { AuthProvider } from './src/contexts/auth';


export default function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <TemplateProvider>
          <Navigator />
        </TemplateProvider>
      </CardProvider>
    </AuthProvider>
  );
}
