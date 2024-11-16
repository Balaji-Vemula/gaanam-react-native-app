import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QuoteCard from './components/QuoteCard';
import FooterMenu from './components/FooterMenu';
import Songs from './components/Songs';
import Player from './components/Player';
import Favorites from './components/Favorites';
import Settings from './components/Settings';
import { SongProvider } from './components/SongContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Songs':
        return <Songs onNavigate={setCurrentScreen} />; // Pass the onNavigate function here
      case 'Player':
        return <Player />;
      case 'Favorites':
        return <Favorites />;
      case 'Settings':
        return <Settings />;
      default:
        return (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <StatusBar style="auto" />
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Gaanam</Text>
              <Text style={styles.subtitle}>Your Perfect Music Companion</Text>
            </View>
            <View style={styles.quotesContainer}>
              <QuoteCard
                quote="Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife."
                author="Kahlil Gibran"
              />
              <QuoteCard
                quote="Where words fail, music speaks."
                author="Hans Christian Andersen"
              />
              <QuoteCard
                quote="Music is the moonlight in the gloomy night of life."
                author="Jean Paul Friedrich Richter"
              />
              <QuoteCard
                quote="Music expresses that which cannot be put into words and cannot remain silent."
                author="Victor Hugo"
              />
              <QuoteCard
                quote="Life is like a beautiful melody, only the lyrics are messed up."
                author="Hans Christian Andersen"
              />
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <SongProvider>
      <View style={styles.container}>
        {renderScreen()}
        <FooterMenu onNavigate={setCurrentScreen} />
      </View>
    </SongProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, // Ensure space for the footer menu
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#f72585', // Vibrant pink
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    textShadowColor: 'rgba(247, 37, 133, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#b5b5b5',
    fontWeight: '300',
    letterSpacing: 1,
  },
  quotesContainer: {
    padding: 20,
  },
});