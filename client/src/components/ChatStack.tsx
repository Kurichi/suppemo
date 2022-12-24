import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatSelector from "../screens/ChatStack/ChatSelector";
import QRCodeReader from "../screens/ChatStack/QRCodeReader";
import ApplyReader from "../screens/ChatStack/ApplyReader";
import ShowQRCode from "../screens/ChatStack/ShowQRCode";
import TemplateList from "./TListView";

const Stack = createStackNavigator();


const showORCodeStack = () => (
  <Stack.Navigator
    initialRouteName="show"
  >
    <Stack.Screen name='show' component={ShowQRCode} />
    <Stack.Screen name='apply' component={ApplyReader} />
    <Stack.Screen name='show' component={showORCodeStack} />
  </Stack.Navigator>
)

export default function ChatStack(props: any) {
  const { navigation } = props;
  return (
    <Stack.Navigator
      initialRouteName="ChatSelector"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen initialParams={{ stack: navigation }} name='ChatSelector' component={ChatSelector} />
      <Stack.Screen initialParams={{ stack: navigation }} name='reader' component={QRCodeReader} />
      <Stack.Screen name='show' component={ShowQRCode} />
      <Stack.Screen name='apply' component={ApplyReader} />
      <Stack.Screen name='list' component={TemplateList} />
    </Stack.Navigator>
  )
}