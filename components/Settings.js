// Settings.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.content}>Here you can adjust your settings.</Text>
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

export default Settings;