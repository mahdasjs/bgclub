import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import boardGamesReducer from './boardGamesReducer';
import resultsReducer from './resultsReducer'
import selectionreducer from './selectionreducer'
import cartReducer from './cartReducer';
import cartPstReducer from './cartPost';
import commentReducer from './commenReducer'
import ratingReducer from './ratingReducer'
import postReducer from './postReducer'
import eventsReducer from './eventReducer'
export default combineReducers({
    News: NewsReducer,
    boardGames: boardGamesReducer,
    results:resultsReducer,
    select:selectionreducer,
    comments:commentReducer,
    ratings:ratingReducer,
    cartsssss:cartReducer,
    posts:postReducer,
    events:eventsReducer,
    cartPost:cartPstReducer
});