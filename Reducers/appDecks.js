import {GETDECKS, ADD_CARD, ADD_DECK} from "../Actions";

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
        default:
            return state
    }
}
export default Decks_Reducer