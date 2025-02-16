// Create a hook that will play a sound when called, without the use-sound library.
// Avoid "AudioContext" was not allowed to start bullshit.

import React from 'react';

const useSound = (url, volume = 1) => {
  const audio = new Audio(url);
  audio.volume = volume;

  const play = () => {
    audio.currentTime = 0;
    audio.play();
  };

  return play;
};

export default useSound;
