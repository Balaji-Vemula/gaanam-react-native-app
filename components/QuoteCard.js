import { StyleSheet, Text, View, ScrollView } from 'react-native';

const QuoteCard = ({ quote, author }) => (
    <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{quote}</Text>
        <Text style={styles.authorText}>- {author}</Text>
    </View>
);

const styles = StyleSheet.create({

    quoteCard: {
        backgroundColor: '#2d2d2d',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    quoteText: {
        fontSize: 18,
        color: '#ffffff',
        lineHeight: 26,
        fontWeight: '400',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    authorText: {
        fontSize: 14,
        color: '#f72585',
        textAlign: 'right',
        fontWeight: '600',
    },
});

export default QuoteCard;