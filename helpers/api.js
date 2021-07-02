const DECKS_KEY = "DECKS_KEY";
import AsyncStorage from "@react-native-async-storage/async-storage";

const decks = {
    React: {
        title: 'React',
            questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
            questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

export const getAllDecks = async () => {
    try{
        const resultsStored = await AsyncStorage.getItem(DECKS_KEY)
        if(resultsStored === null){
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        }
        return resultsStored === null ? decks : JSON.parse(resultsStored)
    } catch (e) {
        console.log(e, 'from here')
    }
};

export  const saveDeck = async (title) => {
    try{
        await AsyncStorage.mergeItem(
            DECKS_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        )
    } catch (err) {
        console.log(err)
    }
};

export const deck = async (id) => {
    try{
        const res = await AsyncStorage.getItem(DECKS_KEY)
        return  JSON.parse(res)[id]
    } catch (err) {
        console.log(err)
    }
};

export const addCard = async (title, card) => {
    try{
        const deckTitle = await deck(title);
        await AsyncStorage.mergeItem(
            DECKS_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deckTitle.questions].concat(card)
                }
            })
        )
    } catch (err) {
        console.log(err, "from adding card to deck")
    }
}