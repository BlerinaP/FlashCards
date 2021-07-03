import React from 'react';
import {View, Text, StyleSheet} from "react-native";


const EachDeck = (props) => {
    const {deck} = props
    if (deck === undefined) {
        return <View><Text>Loading</Text></View>
    }
    return(
        <View>
            <Text style={styles.DeckTitle}>{deck.title}</Text>
            <Text style={styles.DeckDescp}>{deck.questions.length}cards</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    DeckTitle:{
        fontSize: 25,
        color: "black",
        marginBottom: 10
    },
    DeckDescp:{
        fontSize: 15,
        color: "black",
        textAlign: "center"
    }
});
export  default EachDeck