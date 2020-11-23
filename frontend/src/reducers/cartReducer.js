import {ADD_TO_CART, REMOVE_FROM_CART,PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';
// const isProductInBasket = (state, action) => {
//     for (var i=0; i < state.length; i++){
//       if(state[i].data.id == action.payload.id.id){
//         return true;
//       }
//     }
//   }
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
        // case PLUS_LENGTH:
        //     if (isProductInBasket(state, action)) {

        //         return state.map(product => {
        //             if (product.data.id == action.payload.id.id) {
        //             }
        //             return product;
        //         });
        //     }
        default:
            return state;
    }
}