import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardsFolder from '../components/CardsFolder';
import Footer from '../components/Footer';
import WorkSpace from '../components/WorkSpace';
import { useTemplates } from '../contexts/template';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
  const isFocused = useIsFocused();

  const [isVertical, setIsVertical] = useState<boolean>(true);
  const onChangeOrientation = (event: ScreenOrientation.OrientationChangeEvent) => {
    if (event.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      setIsVertical(true);
    }
    else {
      setIsVertical(false);
    }
  }

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(onChangeOrientation);
  }, [])

  useEffect(() => {
    if (isFocused) {
      ScreenOrientation.unlockAsync();
    }
    else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* WorkSpace */}
      <View style={styles.workSpace}>
        <WorkSpace />
      </View>

      {/* CardsFolder */}
      {
        isVertical ? (
          <View style={styles.cardsFolder}>
            <CardsFolder />
          </View>
        ) : (
          <></>
        )
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