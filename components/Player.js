import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { SongContext } from './SongContext';

const Player = () => {
  const {
    selectedSong,
    isPlaying,
    togglePlayPause,
    position,
    duration,
    sound,
  } = useContext(SongContext);

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const renderMetadata = () => {
    if (!selectedSong) {
      return <Text style={styles.noSongText}>No song selected</Text>;
    }

    return (
      <View style={styles.metadataContainer}>
        {selectedSong.picture ? (
          <Image source={{ uri: selectedSong.picture }} style={styles.albumArt} />
        ) : (
          <Image source={require('../assets/default-art.jpg')} style={styles.albumArt} />
        )}
        <Text style={styles.songTitle}>{selectedSong.filename || 'Unknown Title'}</Text>
        <Text style={styles.songArtist}>{selectedSong.artist || 'Unknown Artist'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMetadata()}
      <Slider
        style={styles.slider}
        value={position}
        maximumValue={duration}
        minimumValue={0}
        onSlidingComplete={handleSeek}
        minimumTrackTintColor="#f72585"
        maximumTrackTintColor="#b5b5b5"
      />
      <View style={styles.controls}>
        <TouchableOpacity>
          <MaterialIcons name="skip-previous" size={40} color="#f72585" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <MaterialIcons
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={60}
            color="#f72585"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="skip-next" size={40} color="#f72585" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  metadataContainer: {
    alignItems: 'center',
    width: '90%',
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 18,
    color: '#b5b5b5',
    textAlign: 'center',
  },
  slider: {
    width: '80%',
    marginTop: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
    marginTop: 30,
  },
  noSongText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default Player;