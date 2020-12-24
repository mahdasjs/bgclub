import {SAVE_SELECT_EVENT} from '../actions/types';

export default function selectionReducer(state = [] , action ){
    switch (action.type){
      case SAVE_SELECT_EVENT:
        return action.payload
      default:
        return state
    }
  }