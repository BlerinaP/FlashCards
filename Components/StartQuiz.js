import React from "react"
import {connect} from "react-redux";
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from "react-native";
let width = Dimensions.get('window').width;
import {clearLocalNotification, setLocalNotification} from "../Notification/noty";

class  StartQuiz extends React.Component{
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
    state={
        show: 'question',
        correct: 0,
        incorrect: 0,
        questions: this.props.deck.questions,
        answered: Array(this.props.deck.questions.length).fill(0)
    };
    scrolling = () => {
        this.setState({
            show: 'question'
        });
    };
    reset = () => {
        this.setState({
            show: 'question',
            correct: 0,
            incorrect: 0,

        })
    };
    showResults = (answer, index) => {
        if(answer === 'correct'){
            this.setState((prevState) => ({correct: prevState.correct + 1}))
        }else {
            this.setState((prevState) => ({incorrect: prevState.incorrect + 1}))
        }

        this.setState(prevState => ({
            answered: prevState.answered.map((value, i) => (index === i ? 1 : value))
            }), () => {
                const {correct, incorrect, questions} = this.state;
                if(questions.length === correct + incorrect){
                    this.setState({show: 'results'});
                } else {
                    this.scroll.scrollTo({x: (index + 1) * width})
                    this.setState({show: 'question'})
                }
            }
        )
    };
    render(){
        const {questions, show, correct} = this.state;
        const percentage = ((correct / questions.length) * 100).toFixed(0);
        const{navigation} = this.props;
        if(questions.length === 0){
            return(
                <View style={styles.container}>
                    <Text style={styles.noCard}>You can't take a quiz because there are no cards to this deck. Please go and create Some cards and try again</Text>
                </View>
            )
        }
        if(show === 'results'){
            return(
                <View style={styles.main}>
                    <Text style={styles.done}>Done</Text>
                    <Text style={styles.text}>Quiz Completed</Text>
                    <View style={styles.text}>
                        <Text>{correct} / {questions.length} correct</Text>
                    </View>
                    <Text stlye={styles.text}>
                        {percentage}%
                    </Text>
                    <TouchableOpacity style={styles.restart} onPress={this.reset}>
                        <Text style={{color: "white"}}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.home} onPress={() => {
                        this.reset();
                        navigation.navigate('Home', {screen: 'Home'})
                    }}>
                        <Text style={{color: 'white'}}>Home</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <ScrollView
                style={styles.container}
                pagingEnabled={true}
                horizontal={true}
                onScroll={this.scrolling}
                ref={(node) => this.scroll = node}
            >
                {questions.map((question, index) => {
                    return(
                        <View key={`quiz${index}`} style={styles.main}>
                            <Text style={styles.count}> {index + 1} / {questions.length}</Text>
                            <Text style={styles.text}>{show === 'question' ? question.question : question.answer }</Text>
                                {show === 'question' ?
                                    <TouchableOpacity style={{marginTop: 10}} onPress={() => this.setState({show: 'answer'})}>
                                        <Text style={styles.answer}>Answer</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={{marginTop: 10}} onPress={() => this.setState({show: 'question'})}>
                                        <Text style={styles.question}>Question</Text>
                                    </TouchableOpacity>}
                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.correct} disabled={this.state.show === 'answer'} onPress={() => this.showResults('correct', index)}>
                                    <Text style={{color: '#fff'}}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.incorrect}  disabled={this.state.show === 'answer'} onPress={() => this.showResults('incorrect', index)}>
                                    <Text style={{color: '#fff'}}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        width: width
    },
    main:{
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    done: {
        backgroundColor: 'green',
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlign: 'center'
    },
    home:{
        backgroundColor: 'tomato',
        width: '80%',
        textAlign: 'center',
        padding: 15,
        borderRadius: 5,
        color: '#fff',
    },
    restart:{
        backgroundColor: 'blue',
        width: '80%',
        textAlign: 'center',
        padding: 15,
        borderRadius: 5,
        color: 'black',
        marginBottom: 10,
        marginTop: 10
    },
    text: {
        color: "black",
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 300,
        width: "80%",
    },
    noCard:{
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlign: 'center'
    },
    correct: {
        backgroundColor: 'green',
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlign: 'center',
        margin: 'auto'
    },
    incorrect: {
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: "80%",
        textAlign: 'center',
        margin: 'auto'
    },
    count: {
        textAlign: 'left',
        color: 'black',
        marginBottom: 15,
        marginRight: 'auto'
    },
    answer:{
        textAlign: 'left',
        color: 'green',
        marginBottom: 15
    },
    question:{
        textAlign: 'left',
        color: 'red',
        marginBottom: 15
    },
});
const mapStateToProps = (state, {route}) => {
    const title  = route.params.title;
    const deck = state.GETDECKS[title];
    return{
        deck
    }
}
export default connect(mapStateToProps)(StartQuiz)