import React, { useEffect } from 'react';
import { Audio } from 'expo-av';


const load_sound = new Audio.Sound();
const decision_sound = new Audio.Sound();

const sounds = [
  { key: 'load', path: require('../../assets/sounds/load.mp3') },
  { key: 'decision', path: require('../../assets/sounds/decision.mp3') },
  { key: 'cancel', path: require('../../assets/sounds/cancel.mp3') },
  { key: 'error', path: require('../../assets/sounds/error.mp3') },
]

export const Sounder = async (key: string, type: string) => {

  const path = await sounds.find((v) => v.key == key)?.path;
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync(path);

  if (type = 'play') {
    await soundObject.playAsync();
  } else if (type = 'pause') {
    await soundObject.pauseAsync();
  }
}