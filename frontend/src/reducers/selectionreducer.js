import {SAVE_SELECT} from '../actions/types';

export default function EligibleAbout(state = [] , action ){
    switch (action.type){
      case SAVE_SELECT:
        return action.payload
      default:
        return state
    }
  }