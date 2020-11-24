import { fas } from '@fortawesome/free-solid-svg-icons';
import {ADD_TO_CART, REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';

export default function addToCart(state = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [ ...state,action.payload];
        case REMOVE_FROM_CART:
            var counter=0
            return state.filter((e) => {
                if (e.data.id === action.payload.id) {
                    counter++;
                }
                if (e.data.id !== action.payload.id||counter>1) {
                    console.log(counter)
                    return true;
                }
                console.log(counter)
                return false;
            });
        default:
            return state;
    }
}