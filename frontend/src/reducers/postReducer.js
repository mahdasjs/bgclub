import {ADD_POST_DATA} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_POST_DATA:
            return [ ...action.payload];
        default:
            return state;
    }
}