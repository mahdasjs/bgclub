import {ADD_bg_DATA, PARTICIPATE} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case PARTICIPATE:
            return [ ...action.payload];
        default:
            return state;
    }
}