import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FooterMenu = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.footerContainer}>
      <MenuItem icon="home" label="Home" />
      <MenuItem icon="library-music" label="Songs" />
      <TouchableOpacity style={styles.menuItem} onPress={togglePlayPause}>
        <MaterialIcons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={30}
          color="#f72585"
        />
        <Text style={styles.menuLabel}>Player</Text>
      </TouchableOpacity>
      <MenuItem icon="favorite" label="Favorites" />
      <MenuItem icon="settings" label="Settings" />
    </View>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <MaterialIcons name={icon} size={24} color="#f72585" />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
  },
});

export default FooterMenu;