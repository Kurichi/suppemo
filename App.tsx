import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Camera'
        screenOptions={{
          headerStyle: { backgroundColor: '#82292D' },
          headerTitleStyle: { color: '#ffffff', fontSize: 30 },
          headerTintColor: '#ffffff'
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
