import React,{Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native"
import {connect} from "react-redux";
import {ADD_DECK_APP} from "../Actions";
import {saveDeck} from "../helpers/api";

class AddDeck extends React.Component{
    state={
        inputText: ''
    };
    inputChangeMethod = (text) => {
      this.setState({inputText: text})
    };
    handleAddingDeck = () => {
        const {ADD_DECK_APP, navigation} = this.props;
        ADD_DECK_APP(this.state.inputText);
        saveDeck(this.state.inputText)
        this.setState(() => ({inputText: ''}));
        navigation.goBack();
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={{width: "80%"}}>
                    <Text style={styles.enterText}>Enter Your Deck Title</Text>
                </View>
                <View style={{width: "80%"}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.inputText}
                        onChangeText={this.inputChangeMethod}
                    />
                </View>
                <View style={{width: '80%'}}>
                    <TouchableOpacity style={styles.CreateDeck} onPress={this.handleAddingDeck}>
                        <Text style={styles.CreateDeckText}>Create Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default connect(null, {ADD_DECK_APP})(AddDeck)

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
   CreateDeck: {
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
    CreateDeckText:{
        color: "white",
    }
});