import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatSelector from "../screens/ChatStack/ChatSelector";
import QRCodeReader from "../screens/ChatStack/QRCodeReader";
import ApplyReader from "../screens/ChatStack/ApplyReader";
import ShowQRCode from "../screens/ChatStack/ShowQRCode";

const Stack = createStackNavigator();

export default function ChatStack(props: any) {
  const { navigation } = props;
  return (
    <Stack.Navigator
      initialRouteName="ChatSelector"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen initialParams={{ stack: navigation }} name='ChatSelector' component={ChatSelector} />
      <Stack.Screen name='reader' component={QRCodeReader} />
      <Stack.Screen name='apply' component={ApplyReader} />
      <Stack.Screen name='show' component={ShowQRCode} />
    </Stack.Navigator>
  )
}