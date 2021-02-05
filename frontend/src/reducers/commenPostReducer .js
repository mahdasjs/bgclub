import {ADD_bg_DATA, ADD_COMMENT_POST} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_COMMENT_POST:
            return [ ...action.payload];
        default:
            return state;
    }
}