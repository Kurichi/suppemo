import React from 'react';
import Navigator from './src/components/Navigator';
import { CardProvider } from './src/contexts/card'
import { TemplateProvider } from './src/contexts/template';
import { AuthProvider } from './src/contexts/auth';
import { ChatProvider } from './src/contexts/chat';


export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <CardProvider>
          <TemplateProvider>
            <Navigator />
          </TemplateProvider>
        </CardProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
