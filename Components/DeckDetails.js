import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import {connect }from "react-redux";
import {deleteDeck} from "../Actions";
import {delete_deck} from "../helpers/api";

class DeckDetails extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.deck !== undefined
    }

    handleDeleteDeck = (id) => {
        this.props.deleteDeck(id);
        delete_deck(id);
        this.props.navigation.goBack()
    };
    render(){
       let {deck} = this.props;
        let {navigation} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.AddDeckTexts}>
                    <Text style={styles.AddDeckTitle}>{deck.title === undefined ? 'deck title goes here' : deck.title}</Text>
                    <Text style={styles.AddDeckDescp}>{deck.questions.length} cards</Text>
                </View>
                <TouchableOpacity style={styles.AddCardBtn} onPress={() => navigation.navigate('AddCard', {screen: 'AddCard', title: deck.title })}>
                    <Text style={styles.AddCardText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.StartQuiz} onPress={() => navigation.navigate('StartQuiz', {screen: 'StartQuiz', title: deck.title})}>
                    <Text style={styles.StartQuizText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  this.handleDeleteDeck(deck.title)}>
                    <Text style={styles.deleteDeck}> Delete Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (state, {route}) => {
    const title = route.params.title;
    const deck = state.GETDECKS[title]
    return{
        deck
    }
}
export default connect(mapStateToProps,{deleteDeck})(DeckDetails)
const styles = StyleSheet.create({
    AddCardBtn: {
        backgroundColor: "#cbcbcb",
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        width: "50%",
        marginBottom: 10
    },
    AddCardText: {
        color: "#2b2b2b",
        textAlign: "center",
    },
    StartQuiz: {
        backgroundColor: "#2b2b2b",
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        width: "50%"
    },
    StartQuizText: {
        color: "#fff",
        textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddDeckTexts: {
        marginBottom: 50
    },
    AddDeckTitle:{
        fontSize: 25,
        color: "black",
        marginBottom: 10
    },
    AddDeckDescp:{
        fontSize: 15,
        color: "gray",
        textAlign: "center"
    },
    deleteDeck:{
        color: 'red',
        marginTop: 10
    }
});