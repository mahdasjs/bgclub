import {REMOVE_FROM_CART} from '../actions/types';

export default function addToCart(state = [], action) {
    switch (action.type) {
        case REMOVE_FROM_CART:
            return state.filter((e) => {
                if (e.id !== action.payload.id) {
                    return true;
                }
                return false;
            });
        default:
            return state;
    }
}
