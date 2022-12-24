import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, } from 'react-native';
import { GiftedChat, IMessage, Message, User } from 'react-native-gifted-chat';
import { useChat } from '../contexts/chat';
import TListView from '../components/TListView';
import { StackScreenProps } from '@react-navigation/stack';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Render from '../services/RenderChat';

import { useCard } from '../contexts/card';
import { getAuth } from 'firebase/auth';

type props = StackScreenProps<NavigationProps, "Chat">

export default function Chat({ navigation, route }: props) {
  const { cards } = useCard();
  const { talk } = route.params;
  const { sendMessage } = useChat();
  const [isShowTemplate, setShow] = useState<boolean>(false);

  // const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: talk.talk_with.name,
    });
  }, [talk]);


  function getUniqueStr(myStrong?: number): string {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return (
      new Date().getTime().toString(16) +
      Math.floor(strong * Math.random()).toString(16)
    );
  }


  const onSend = useCallback((messages: IMessage[] = []) => {
    sendMessage(talk.talk_with._id, messages);
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const onImageSend = async (image: captureImage) => {
    const auth = getAuth();
    const sendedImage: IMessage = {
      _id: getUniqueStr(),
      text: '',
      createdAt: new Date(),
      user: {
        _id: auth.currentUser?.uid ?? '',
        avatar: auth.currentUser?.photoURL ?? '',
        name: auth.currentUser?.displayName ?? '',
      },
      image: image.uri,
    };
    sendMessage(talk.talk_with._id, [sendedImage]);
  }

  const capture = async (viewShot: ViewShot, height: number, width: number) => {
    const uri = await captureRef(viewShot);
    const image: captureImage = {
      uri: uri,
      height: height,
      width: width,
    }
    setShow(false);
    onImageSend(image);
    console.log(image)
  }


  return (
    <View style={styles.container}>
      <View style={{ flex: isShowTemplate ? 6 : 1 }}>
        <GiftedChat
          messages={talk.messages as Message[]}
          placeholder='メッセージを入力'
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          alwaysShowSend
          locale='ja'
          renderSend={Render.renderSend}
          renderActions={() => Render.renderAction(setShow, isShowTemplate)}
          renderInputToolbar={Render.renderInputToolbar}
          renderComposer={Render.renderComposer}
          alignTop={true}

        />
      </View>
      {isShowTemplate ? (
        <View style={[{ flex: 4 }]}>
          <TListView viewShot={capture} />
        </View>
      ) : (
        <View>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
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
