// Player.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Player = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player</Text>
      <Text style={styles.content}>This is where the music player will be.</Text>
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
  title: {
    fontSize: 32,
    color: '#f72585',
  },
  content: {
    color: '#ffffff',
  },
});

export default Player;