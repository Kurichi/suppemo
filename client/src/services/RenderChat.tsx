import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/base';
import {
  Send,
  SendProps,
  InputToolbar,
  InputToolbarProps,
  ComposerProps,
  Composer,
  MessageImageProps,
  IMessage,
  MessageImage
} from 'react-native-gifted-chat';



export const renderSend = (props: SendProps<Message>) => {
  return (
    <Send
      {...props}
      containerStyle={styles.send}
    >
      <Icon name='send' type='font-awesome' color='blue' size={24} />
    </Send>
  )
}

export const renderAction = (setShow: React.Dispatch<React.SetStateAction<boolean>>, isShowTemplate: boolean) => {
  return (
    <View style={styles.action}>
      <Button
        type='clear'
        icon={{
          name: 'cards-outline',
          type: 'material-community',
          size: 28,
          color: 'white',
        }}
        onPress={() => setShow(isShowTemplate ? false : true)}
      />
    </View>
  )
}

export const renderInputToolbar = (props: InputToolbarProps<Message>) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.toolbar}
    />
  );
}

export const renderComposer = (props: ComposerProps) => {
  return (
    <Composer {...props} textInputStyle={styles.composer} />
  )
}

export const renderMessageImage = (props: MessageImageProps<IMessage>) => {
  return (
    <MessageImage
      {...props}
      containerStyle={{
        width: 300,
        height: 160,
      }}
    />
  )
}

const styles = StyleSheet.create({
  send: {
    marginHorizontal: 8,
    justifyContent: 'center',
    marginBottom: 4,
  },
  composer: {
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  toolbar: {
    backgroundColor: '#FCD12C',
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
    marginLeft: 4,
    marginBottom: 8,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  action: {
    marginHorizontal: 4,
    marginVertical: 4,
    justifyContent: 'center',
    borderRadius: 21,
  }
})