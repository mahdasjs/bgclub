import {SAVE_SELECT_OPTION} from '../actions/types';

// export default function EligibleAbout(state = { selections: [] } , action = {}){
//     switch (action.type){
//       case SAVE_SELECT_OPTION:
//         return [...state, action.payload]
//       default:
//         return state
//     }
//   }
export default function favoritesReducer(state = [], action) {
    switch (action.type) {
        case SAVE_SELECT_OPTION:
            return [...state, action.payload];
        default:
            return state;
    }
}