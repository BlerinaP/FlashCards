import React from "react"
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {getDecks} from "../Actions";
import EachDeck from "./eachDeck";

class Home extends React.Component{
    componentDidMount() {
        this.props.dispatch(getDecks())
    }

    render(){
        let {decks, navigation} = this.props
        if(Object.keys(decks.GETDECKS).length === 0){
            return <View><Text>Loading...</Text></View>
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    {Object.values(decks.GETDECKS).map(deck => {
                        return(
                            <TouchableOpacity key={deck.title} style={styles.buttonDecks}  onPress={() => navigation.navigate('DeckDetails', {title: deck.title, cards: deck.questions})}>
                                <EachDeck deck={deck}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return(
        {
            decks: state
        }
    )
};
export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    buttonDecks:{
        backgroundColor: 'tomato',
        width: '80%',
        textAlign: 'center',
        marginBottom: 30,
        padding: 15,
        borderRadius: 5,
        margin: 'auto'
    }
});