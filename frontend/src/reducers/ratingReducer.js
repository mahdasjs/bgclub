import {ADD_RATINNG,CHECK_RATING} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_RATINNG:
            return [ ...state,action.payload];
        case CHECK_RATING:
            return state.filter((e) => {
                if (e.data.username !== action.payload.username||e.data.id!==action.payload.id) {
                    return true;
                }
                return false;
            });
        default:
            return state;
    }
}