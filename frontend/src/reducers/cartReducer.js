import {ADD_TO_CART, REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';

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
        case PLUS_LENGTH:
            return state.filter((e) => {
                if (e.data.id !== action.payload.id) {
                    return {
                        len:state.len+1
                    };
                }
            });
        case MINUS_LENGTH:
            return state.filter((e) => {
                if (e.data.id !== action.payload.id) {
                    console.log(state.len)
                }
                console.log(state.len)

            });
        default:
            return state;
    }
}