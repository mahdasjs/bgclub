import {SAVE_SELECT} from '../actions/types';

export default function selectionReducer(state = [] , action ){
    switch (action.type){
      case SAVE_SELECT:
        return action.payload
      default:
        return state
    }
  }