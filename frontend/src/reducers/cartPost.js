import { fas } from '@fortawesome/free-solid-svg-icons';
import {REMOVE_ALL_POST_CART, ADD_POST_TO_CART,REMOVE_POST_FROM_CART,MINUS_LENGTH} from '../actions/types';

export default function addToCart(state = [], action) {
    switch (action.type) {
        case ADD_POST_TO_CART:
            return [ ...state,action.payload];
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
        case REMOVE_ALL_POST_CART:
            return state.filter((e) => {
                if (e.data.id === action.payload.id) {
                    return true;
                }
            });
        default:
            return state;
    }
}