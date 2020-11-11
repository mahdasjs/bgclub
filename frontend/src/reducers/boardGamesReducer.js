import {ADD_bg_DATA} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_bg_DATA:
            return [ ...action.payload];
        default:
            return state;
    }
}