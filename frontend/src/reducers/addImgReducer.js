import {ADD_IMG} from '../actions/types';

export default function selectionReducer(state = [] , action ){
    switch (action.type){
      case ADD_IMG:
        return action.payload
      default:
        return state
    }
  }