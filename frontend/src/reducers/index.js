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
import selectEventReducer from './selectEventreducer copy'
import selectPostReducer from './selectPostreducer'
import selectBG from './selectBGreducer copy'
import commentsPostReducer from './commenPostReducer '
import participateReducer from './participateReducer'
import ratingBGReducer from './ratingBGReducer'
export default combineReducers({
    News: NewsReducer,
    boardGames: boardGamesReducer,
    results:resultsReducer,
    select:selectionreducer,
    comments:commentReducer,
    commentsPost:commentsPostReducer,
    ratings:ratingReducer,
    ratingsBG:ratingBGReducer,
    ratings:ratingReducer,
    cartsssss:cartReducer,
    posts:postReducer,
    events:eventsReducer,
    cartPost:cartPstReducer,
    selectEvent:selectEventReducer,
    selectPost:selectPostReducer,
    selectBG:selectBG,
    participate:participateReducer
});