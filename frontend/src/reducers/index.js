import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import boardGamesReducer from './boardGamesReducer';
import resultsReducer from './resultsReducer'
export default combineReducers({
    News: NewsReducer,
    boardGames: boardGamesReducer,
    results:resultsReducer
});