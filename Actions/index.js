export const GETDECKS = "GETDECKS";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";

import {getAllDecks, saveDeck} from "../helpers/api";

export function DecksAction(decks){
    return{
        type: GETDECKS,
        decks
    }
}

export function getDecks() {
    return dispatch => {
        return getAllDecks().then(decks => {
            dispatch(DecksAction(decks));
        })
    }
}

export function ADD_DECK_APP(title){
    return{
        type: ADD_DECK,
        title
    }
}

export function addCardDeck(id, card) {
    return{
        type: ADD_CARD,
        id,
        card
    }
}
