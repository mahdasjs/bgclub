import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import boardGamesReducer from './boardGamesReducer';
import resultsReducer from './resultsReducer'
import selectionreducer from './selectionreducer'
import cartReducer from './cartReducer';
import cartPage from '../cartPage';
import commentReducer from './commenReducer'
import ratingReducer from './ratingReducer'
export default combineReducers({
    News: NewsReducer,
    boardGames: boardGamesReducer,
    results:resultsReducer,
    select:selectionreducer,
    comments:commentReducer,
    ratings:ratingReducer,
    cartsssss:cartReducer,
    // cart:cartReducer
});