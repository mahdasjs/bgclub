import {SAVE_SELECT_POST} from '../actions/types';

export default function selectionReducer(state = [] , action ){
    switch (action.type){
      case SAVE_SELECT_POST:
        return action.payload
      default:
        return state
    }
  }