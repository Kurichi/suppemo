import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardsFolder from '../components/CardsFolder';
import WorkSpace from '../components/WorkSpace';
import { useTemplates } from '../contexts/template';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type props = StackScreenProps<NavigationProps, 'Home'>

export default function Home({ navigation, route }: props) {
  const isFocused = useIsFocused();

  const [isVertical, setIsVertical] = useState<boolean>(true);
  const onChangeOrientation = (event: ScreenOrientation.OrientationChangeEvent) => {
    if (event.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      setIsVertical(true);
      navigation.setOptions({
        tabBarVisible: true,
      })
    }
    else {
      setIsVertical(false);
      navigation.setOptions({
        tabBarVisible: false,
      })
    }
  }

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(onChangeOrientation);
  }, [])

  useEffect(() => {
    isFocused ? ScreenOrientation.unlockAsync() :
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, [isFocused]);

  const [current_ws, setCurrent] = useState<number>(0);

  return (
    <View style={styles.container}>
      {/* WorkSpace */}
      <View style={styles.workSpace}>
        <WorkSpace
          current_ws={current_ws}
          setCurrent={setCurrent}
          isVertical={isVertical}
          init_index={route.params.init_WS_index} />
      </View>

      {/* CardsFolder */}
      {
        isVertical ? (
          <View style={styles.cardsFolder}>
            <CardsFolder current_ws={current_ws} />
          </View>
        ) : (<></>)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8B0',
  },
  workSpaceName: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    backgroundColor: '#ffffff',
  },
  WorkSpaceTitle: {
    fontSize: 24,
    lineHeight: 32,
    paddingLeft: 8,
    paddingRight: 8,
  },
  workSpace: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
    paddingTop: 8,
  },
  cardsFolder: {
    flex: 3,
    paddingTop: 8,
  }
});