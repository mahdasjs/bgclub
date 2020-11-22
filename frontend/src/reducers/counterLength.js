import {PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';

export default function boardGamesReducer(state =[], action) {
    switch (action.type) {
        case PLUS_LENGTH:
            return [ ...state,action.payload]
        default:
            return state;
    }
}