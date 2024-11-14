import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import QuoteCard from './components/QuoteCard';
import FooterMenu from './components/FooterMenu';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar style="auto" />
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Gaanam</Text>
          <Text style={styles.subtitle}>Your Perfect Music Companion</Text>
        </View>

        {/* Quotes Section */}
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

      {/* Footer Menu */}
      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background
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