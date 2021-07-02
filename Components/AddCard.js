import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native"
import {connect} from "react-redux";
import {addCard} from "../helpers/api";
import {addCardDeck} from "../Actions";

class AddCard extends React.Component{
    state={
        cardQuestion: '',
        cardAnswer: ''
    };
    questionChangeMethod = (text) => {
        this.setState({cardQuestion: text})
    };
    answerChangeMethod = (text) => {
        this.setState({cardAnswer: text})
    };
    handleSubmitCard = () => {
       let {title, addCardDeck} = this.props
        const card = {
            question: this.state.cardQuestion,
            answer: this.state.cardAnswer
        };
        addCardDeck(title, card)
        addCard(title, card)
        this.setState({cardQuestion: '', cardAnswer: ''})
        this.props.navigation.goBack()
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={{width: "80%"}}>
                    <Text style={styles.enterText}>Enter Your Card Title</Text>
                </View>
                <View style={{width: "80%"}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.cardQuestion}
                        onChangeText={this.questionChangeMethod}
                    />
                </View>
                <View style={{width: "80%", marginTop: 10}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.cardAnswer}
                        onChangeText={this.answerChangeMethod}
                    />
                </View>
                <View style={{width: '80%'}}>
                    <TouchableOpacity style={styles.CreateCard} onPress={() => this.handleSubmitCard()}>
                        <Text style={styles.CreateCardText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state, {route}) => {
    const title = route.params.title;
    return{
        title
    }
}
export default connect(mapStateToProps, {addCardDeck})(AddCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        height: 45,
        borderRadius: 5,
        paddingLeft: "15px"
    },
    enterText: {
        color: 'tomato',
        marginBottom: 15,
        fontSize: 20,
        textTransform: 'uppercase'
    },
    CreateCard: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: "100%",
        marginTop: 15,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CreateCardText:{
        color: "white",
    }
});