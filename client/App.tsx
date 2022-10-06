import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Camera from './src/screens/Camera';
import SignUp from './src/screens/SignUp';
import Navigator from './src/components/Navigator';
import { View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Navigator />
  );
}
