import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useChat } from '../contexts/chat';
import TListView from '../components/TListView';
import { StackScreenProps } from '@react-navigation/stack';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Render from '../services/RenderChat';

import { useCard } from '../contexts/card';
import { getAuth } from 'firebase/auth';

type props = StackScreenProps<NavigationProps, "Chat">

export default function Chat({ navigation, route }: props) {
  const auth = getAuth();
  const { cards } = useCard();
  const { _id } = route.params;
  const { talks, sendMessage } = useChat();
  const [isShowTemplate, setShow] = useState<boolean>(false);

  const [index, setIndex] = useState<number>(0);

  let x = -1;
  useEffect(() => {
    navigation.setOptions({
      title: talks.get(_id)?.talk_with.name,
    });
  }, []);

  useEffect(() => {
    console.log(talks.get(_id));
    talks.get(_id)?.messages.forEach((value) => {
      const num = +value._id
      if (x < num) {
        x = num;
      }
      return 1;
      setIndex(index > value._id ? index : value._id);
    });
  }, [talks])

  function getUniqueStr(): number {
    x++;
    return x;
  }

  const onSend = useCallback((messages: IMessage[] = []) => {
    messages[0]._id = getUniqueStr();
    console.log(messages);
    sendMessage(_id, messages);
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const onImageSend = async (image: captureImage) => {
    const user = auth.currentUser;
    const sendedImage: IMessage = {
      _id: getUniqueStr(),
      text: '',
      createdAt: new Date(),
      user: {
        _id: user?.uid ?? '',
        avatar: user?.photoURL ?? '',
        name: user?.displayName ?? '',
      },
      image: image.uri,
    };

    sendMessage(_id, [sendedImage]);
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
          messages={talks.get(_id)?.messages.sort((l, r) => { return l._id < r._id ? 1 : -1 })}
          placeholder='メッセージを入力'
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser?.uid ?? -1,
            name: auth.currentUser?.displayName ?? '',
            avatar: auth.currentUser?.photoURL ?? '',
          }}
          alwaysShowSend
          locale='ja'
          renderSend={Render.renderSend}
          renderActions={() => Render.renderAction(setShow, isShowTemplate)}
          renderInputToolbar={Render.renderInputToolbar}
          renderComposer={Render.renderComposer}
          alignTop={true}
          inverted={true}
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
