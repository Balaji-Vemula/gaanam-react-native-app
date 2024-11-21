import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { SongContext } from './SongContext';

const Songs = () => {
  const { songs, setSongs, playSong } = useContext(SongContext);

  const excludedDirectories = [
    'call recordings',
    'whatsapp audio',
    'recordings',
  ].map(dir => dir.toLowerCase());

  const shouldExcludeSong = (song) => {
    const albumName = (song.album || '').toLowerCase();
    const uri = (song.uri || '').toLowerCase();
    
    return excludedDirectories.some(dir =>
      albumName.includes(dir) || uri.includes(dir)
    );
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        fetchSongs();
      } else {
        Alert.alert('Permission Required', 'Media Library permission is required!');
      }
    };

    requestPermissions();
  }, []);

  const fetchSongs = async () => {
    try {
      const options = {
        mediaType: MediaLibrary.MediaType.audio,
        first: 100,
      };
      const response = await MediaLibrary.getAssetsAsync(options);
      
      // Filter out unwanted songs
      const filteredSongs = response.assets.filter(song => !shouldExcludeSong(song));

      setSongs(filteredSongs);
    } catch (error) {
      console.error("Error reading songs:", error);
    }
  };

  const handleSongPress = (song) => {
    playSong(song);
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.songItem} onPress={() => handleSongPress(item)}>
      <View>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.filename || item.name}
        </Text>
        <Text style={styles.albumText} numberOfLines={1}>
          {item.album || 'Unknown Album'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs</Text>
      {songs.length > 0 ? (
        <FlatList
          data={songs}
          renderItem={renderSong}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noSongsText}>No songs found on your device.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#f72585',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  songItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2d2d2d',
    marginBottom: 10,
  },
  songTitle: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 4,
  },
  albumText: {
    color: '#b5b5b5',
    fontSize: 14,
  },
  noSongsText: {
    color: '#b5b5b5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Songs;