// Songs.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Songs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs</Text>
      <Text style={styles.content}>Here will be a list of songs.</Text>
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

export default Songs;