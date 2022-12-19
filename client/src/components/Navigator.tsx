import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Home from './../screens/Home';
import TemplateList from '../screens/TemplateList';
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Chat from '../screens/Chat';
import CameraStack from './CameraStack';
import ChatStack from './ChatStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(props: any) {
  const { navigation } = props;
  const iconSize = 42;
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeBackgroundColor: '#FCD12C',
        inactiveBackgroundColor: '#FCD12C',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#000000',
        showLabel: false
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather name="home" size={iconSize} color={color} />
          ))
        }}
      />

      {/* Template List */}
      <Tab.Screen
        name="TemplateList"
        component={TemplateList}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather name="grid" size={iconSize} color={color} />
          ))
        }}
      />

      {/* Chat */}
      <Tab.Screen
        name="ChatSelector"
        component={ChatStack}
        initialParams={{ stack: navigation }}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather name="message-square" size={iconSize} color={color} />
          ))
        }}
      />


      {/* CreateDeck
      <Tab.Screen
        name="Deck"
        component={CreateCard}
        options={{
          tabBarIcon: (({color}) => (
            <Icon
          ))
        }} */}
      {/* Camera */}
      <Tab.Screen
        name="Camera"
        component={CameraStack}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather name="image" size={iconSize} color={color} />
          ))
        }}
      />
    </Tab.Navigator>
  )
}


export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: { backgroundColor: '#82292D' },
          headerTitleStyle: { color: '#ffffff', fontSize: 30 },
          headerTintColor: '#ffffff',
          title: 'さぽえも',
          headerTitleAlign: 'center'
        }}
      >
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
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="Tab" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}