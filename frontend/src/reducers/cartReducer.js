import { fas } from '@fortawesome/free-solid-svg-icons';
import {ADD_TO_CART, REMOVE_FROM_CART,REMOVE_POST_FROM_CART,MINUS_LENGTH} from '../actions/types';

export default function addToCart(state = [], action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [ ...state,action.payload];
        case REMOVE_FROM_CART:
            var counter=0
            return state.filter((e) => {
                if (e.data.bgid === action.payload.id) {
                    counter++;
                }
                if (e.data.bgid !== action.payload.id||counter>1) {
                    return true;
                }
                return false;
            });
        case REMOVE_POST_FROM_CART:
            var counter=0
            return state.filter((e) => {
                if (e.data.postid === action.payload.id) {
                    counter++;
                }
                if (e.data.postid !== action.payload.id||counter>1) {
                    return true;
                }
                return false;
            });
        default:
            return state;
    }
}