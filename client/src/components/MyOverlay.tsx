import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp, TextInput, GestureResponderEvent } from "react-native";
import { Button, Overlay, Text } from "@rneui/base";

const x = () => { };

export interface MyOverlayProps {
  title: string | undefined | null,
  currentValue?: string | undefined,
  children?: React.ReactNode | undefined
  onChangeText?: (text: string) => void | undefined
  isVisible: boolean
  onBackdropPress?: () => void | undefined
  buttonText?: string | undefined
  onPress?: (event: GestureResponderEvent) => any | undefined

  titleStyle?: StyleProp<ViewStyle> | undefined,
  overlayStyle?: StyleProp<ViewStyle> | undefined,
  inputStyle?: StyleProp<ViewStyle> | undefined,
  buttonStyle?: StyleProp<ViewStyle> | undefined,
}


export default function MyOverlay({
  title,
  currentValue,
  children: inputElement,
  onChangeText,
  isVisible,
  onBackdropPress,
  buttonText,
  onPress,

  titleStyle,
  overlayStyle,
  inputStyle,
  buttonStyle,
}: MyOverlayProps) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[styles.overlay, overlayStyle,]}
    >
      <View>
        <Text style={[styles.title, titleStyle]} >{title}</Text>
        {inputElement ?? (
          <TextInput
            defaultValue={currentValue}
            onChangeText={onChangeText}
            style={[styles.input, inputStyle]}
          />
        )}
        <Button
          title={buttonText ? buttonText : '変更する'}
          type="clear"
          style={[styles.button, buttonStyle]}
          titleStyle={{ color: "#FFFFFF", }}
          onPress={onPress}
        />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
  input: {
    fontSize: 28,
    margin: 20,
    borderWidth: 1,
    borderColor: '#5555556b',
  },
  button: {
    backgroundColor: "#ffc343",
    borderRadius: 5,
  },
});
