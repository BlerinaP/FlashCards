import React from 'react';
import {View, Text, StyleSheet} from "react-native-web";


const EachDeck = (props) => {
    const {deck} = props;
    return(
        <View style={styles.DeckTexts}>
            <Text style={styles.DeckTitle}>{deck.title}</Text>
            <Text style={styles.DeckDescp}>{deck.questions.length} cards</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    DeckTitle:{
        fontSize: 25,
        color: "black",
        fontWeight: 600,
        marginBottom: 10
    },
    DeckDescp:{
        fontSize: 15,
        color: "black",
        fontWeight: 300,
        textAlign: "center"
    }
});
export  default EachDeck