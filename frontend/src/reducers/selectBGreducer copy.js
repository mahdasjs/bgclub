import {SAVE_SELECT_BG} from '../actions/types';

export default function selectionReducer(state = [] , action ){
    switch (action.type){
      case SAVE_SELECT_BG:
        return action.payload
      default:
        return state
    }
  }