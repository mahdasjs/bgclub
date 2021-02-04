import {ADD_RATINNG_BG,CHECK_RATING_BG} from '../actions/types';

export default function boardGamesReducer(state = [], action) {
    switch (action.type) {
        case ADD_RATINNG_BG:
            return [ ...state,action.payload];
        case CHECK_RATING_BG:
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