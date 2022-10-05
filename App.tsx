import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';
import SignUp from './src/screens/SignUp';

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
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
