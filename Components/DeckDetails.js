import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import {connect }from "react-redux";

class DeckDetails extends React.Component{
    render(){
       let {deck} = this.props;
        let {navigation} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.AddDeckTexts}>
                    <Text style={styles.AddDeckTitle}>{deck.title}</Text>
                    <Text style={styles.AddDeckDescp}>{deck.questions.length} cards</Text>
                </View>
                <TouchableOpacity style={styles.AddCardBtn} onPress={() => navigation.navigate('AddCard', {screen: 'AddCard', title: deck.title })}>
                    <Text style={styles.AddCardText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.StartQuiz} onPress={() => navigation.navigate('StartQuiz', {screen: 'StartQuiz', title: deck.title})}>
                    <Text style={styles.StartQuizText}>Start Quiz</Text>
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
export default connect(mapStateToProps)(DeckDetails)
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
        fontWeight: "500",
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
        fontWeight: "500",
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
        fontWeight: 600,
        marginBottom: 10
    },
    AddDeckDescp:{
        fontSize: 15,
        color: "gray",
        fontWeight: 300,
        textAlign: "center"
    }
});