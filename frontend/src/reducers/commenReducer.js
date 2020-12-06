import {ADD_bg_DATA, ADD_COMMENT} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [ ...state,action.payload];
        default:
            return state;
    }
}