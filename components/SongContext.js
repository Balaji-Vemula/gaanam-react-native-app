import React, { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSong = async (song) => {
    if (sound) {
      await sound.unloadAsync(); // Unload previous sound
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setSelectedSong(song); // Set the currently selected song
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync(); // Pause the sound
      } else {
        await sound.playAsync(); // Play the sound
      }
      setIsPlaying(!isPlaying); // Toggle the play state
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  return (
    <SongContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        isPlaying,
        playSong,
        togglePlayPause,
        position,
        setPosition,
        duration,
        sound, // Expose sound object
      }}
    >
      {children}
    </SongContext.Provider>
  );
};