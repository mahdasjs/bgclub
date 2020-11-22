import {PLUS_LENGTH,MINUS_LENGTH} from '../actions/types';
const INITIAL_STATE = ({
    id: 10000,
    counter:0
  });
export default function boardGamesReducer(state = [{id: 10000,counter:0}], action) {
    switch (action.type) {
        case PLUS_LENGTH:
            return [ ...action.payload];

        case MINUS_LENGTH:
            return [ ...action.payload];

        default:
            return state;
    }
}