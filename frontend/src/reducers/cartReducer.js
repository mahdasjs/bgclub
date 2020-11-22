import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/types';

export default function addToCart(state = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [ ...state,action.payload];
        case REMOVE_FROM_CART:
            return state.filter((e) => {
                if (e.data.id !== action.payload.id) {
                    return true;
                }
                return false;
            });
        default:
            return state;
    }
}