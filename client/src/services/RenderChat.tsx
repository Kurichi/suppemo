import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/base';
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  InputToolbar,
  InputToolbarProps,
  ComposerProps,
  Composer,
  ActionsProps,
  Actions,
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
    <View
      style={styles.action}
    >
      <Button
        type='clear'
        icon={{
          name: 'cards-outline',
          type: 'material-community',
          size: 28,
          color: 'white',
        }}
        onLongPress={() => setShow(isShowTemplate ? false : true)}
      />
    </View>
  )
}

// const renderAction = (props: ActionsProps) => {
//   return (
//     <Actions
//       {...props}
//       options={{
//         ['Send Image']: () => { console.log('image') }
//       }}
//       icon={() => (
//         <Icon name='cards-outline' type='material-community' size={28} color='white' />
//       )}
//       onSend={args => console.log(args)}
//     />
//   )
// }

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