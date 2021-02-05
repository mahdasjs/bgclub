import {ADD_PRESELL_DATA} from '../actions/types';

export default function eventReducer(state = [], action) {
    switch (action.type) {
        case ADD_PRESELL_DATA:
            return [ ...action.payload];
        default:
            return state;
    }
}