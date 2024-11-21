import React, { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const playSongAtIndex = async (index) => {
    try {
      // Set audio mode for background playback
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      if (sound) {
        await sound.unloadAsync();
      }

      const song = songs[index];
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.uri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setSelectedSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const playSong = async (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      setSelectedSong(song);
      playSongAtIndex(index);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    if (currentIndex < songs.length - 1) {
      playSongAtIndex(currentIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      playSongAtIndex(currentIndex - 1);
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
        songs,
        setSongs,
        selectedSong,
        currentIndex,
        isPlaying,
        playSong,
        togglePlayPause,
        playNext,
        playPrev,
        position,
        duration,
        sound,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};