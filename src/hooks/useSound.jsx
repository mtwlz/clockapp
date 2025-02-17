// Create a hook that will play a sound when called, without the use-sound library.
// Avoid "AudioContext" was not allowed to start bullshit.

import React from 'react';
import { GlobalContext } from '../contexts/globalContext';

const useSound = (url, volume = 1) => {
  const { setIsPlaying } = React.useContext(GlobalContext);
  const fileName = url.split('/').pop().split('.')[0];
  const audio = new Audio(url);
  audio.volume = volume;

  const excludedFromAnimations = ['tick', 'pop-down', 'pop-up-on', 'pop-up-off'];

  const play = () => {
    if (!excludedFromAnimations.includes(fileName)) setIsPlaying(true);
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener('ended', () => setIsPlaying(false));
  };

  return play;
};

export default useSound;
