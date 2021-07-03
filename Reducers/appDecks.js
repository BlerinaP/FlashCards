import {GETDECKS, ADD_CARD, ADD_DECK, DELETE_DECK} from "../Actions";

function Decks_Reducer (state={}, action) {
    switch(action.type){
        case GETDECKS:
            return{
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            const {title} = action;
            return{
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            };
        case ADD_CARD:
            const {id, card} = action
            return{
                ...state,
                [id]: {
                    ...state[id],
                    questions: [...state[id].questions].concat(card)
                }
            };
        case DELETE_DECK:
            const deckId = action.id
            const { [ deckId ]: value, ...decksRemained} = state;
            return decksRemained
        default:
            return state
    }
}
export default Decks_Reducer