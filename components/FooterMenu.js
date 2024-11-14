import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FooterMenu = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNavigate = (screen) => {
    onNavigate(screen);
  };

  return (
    <View style={styles.footerContainer}>
      <MenuItem icon="home" label="Home" onPress={() => handleNavigate('Home')} />
      <MenuItem icon="library-music" label="Songs" onPress={() => handleNavigate('Songs')} />
      
      {/* Separate TouchableOpacity for icon and label */}
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={togglePlayPause}>
          <MaterialIcons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={30}
            color="#f72585"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Player')}>
          <Text style={styles.menuLabel}>Player</Text>
        </TouchableOpacity>
      </View>

      <MenuItem icon="favorite" label="Favorites" onPress={() => handleNavigate('Favorites')} />
      <MenuItem icon="settings" label="Settings" onPress={() => handleNavigate('Settings')} />
    </View>
  );
};

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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