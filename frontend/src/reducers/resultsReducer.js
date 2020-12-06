import {ADD_RESULT_DATA} from '../actions/types';

export default function resultReducer(state = [], action) {
    switch (action.type) {
        case ADD_RESULT_DATA:
            return [ ...action.payload];
        default:
            return state;
    }
}