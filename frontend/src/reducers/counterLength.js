import {PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';
const INITIAL_STATE = ({
    id: 10000,
    counter:0
  });
const isProductInBasket = (state, action) => {
    for (var i=0; i < state.length; i++){
      if(state[i].data.id == action.payload.id){
        return true;
      }
    }
  }
export default function boardGamesReducer(state = [{id: 10000,counter:0}], action) {
    switch (action.type) {
        // case PLUS_LENGTH:
        //     if (isProductInBasket(state, action)) {
        //         return state.map(product => {
        //             if (product.id == action.data.product.id) {
        //                 return { ...product, len: product.len + 1 };
        //             }
        //             return product;
        //         });
        //     }

        case MINUS_LENGTH:
            return [ ...action.payload];

        default:
            return state;
    }
}