import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [permission, setPermission] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  // const [downloadsSongs, setDownloadsSongs] = useState([]);

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
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

      if (Platform.OS === 'android') {
        const { status: storagePermissionStatus } = await MediaLibrary.requestPermissionsAsync();
        setPermission({ mediaLibrary: mediaLibraryStatus, storage: storagePermissionStatus });
      } else {
        setPermission({ mediaLibrary: mediaLibraryStatus });
      }

      if (mediaLibraryStatus === 'granted') {
        fetchSongs();
        fetchDownloadsSongs();
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

      if (endCursor) {
        options.after = endCursor;
      }

      const response = await MediaLibrary.getAssetsAsync(options);
      const filteredSongs = response.assets.filter(song => !shouldExcludeSong(song));

      const songsWithInfo = await Promise.all(
        filteredSongs.map(async (song) => {
          const info = await MediaLibrary.getAssetInfoAsync(song.id);
          return { ...song, ...info };
        })
      );

      setSongs(prevSongs => [...prevSongs, ...songsWithInfo]);
      setEndCursor(response.endCursor);
      setHasNextPage(response.hasNextPage);
    } catch (error) {
      console.error("Error reading songs:", error);
    }
  };

// const fetchDownloadsSongs = async () => {
//   try {
//     const downloadsDir = FileSystem.documentDirectory + '../../Downloads'; // Adjust this path
//     const files = await FileSystem.readDirectoryAsync(downloadsDir);

//     const audioFiles = files.filter(file =>
//       file.endsWith('.mp3') || file.endsWith('.wav') // You can add more formats as needed
//     );

//     const downloadsSongs = audioFiles.map(file => ({
//       filename: file,
//       uri: `${downloadsDir}/${file}`,
//     }));

//     setDownloadsSongs(downloadsSongs); // Set your state with the audio files found
//   } catch (error) {
//     console.error('Error accessing Downloads folder:', error);
//     Alert.alert('Error', 'Could not access Downloads folder: ' + error.message);
//   }
// };


  // Define the handleLoadMore function
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchSongs(); // Call the fetchSongs function to load more songs
    }
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.songItem}>
      <View>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.filename || item.name} {/* Fallback to name */}
        </Text>
        <Text style={styles.albumText} numberOfLines={1}>
          {item.album || 'Unknown Album'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const allSongs = [...songs];
  // const allSongs = [...songs, ...downloadsSongs];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs</Text>
      {allSongs.length > 0 ? (
        <FlatList
          data={allSongs}
          renderItem={renderSong}
          keyExtractor={item => item.id || item.uri}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore} // Use the defined handleLoadMore function here
          onEndReachedThreshold={0.5}
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
