import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';
import boardGamesReducer from './boardGamesReducer';
import resultsReducer from './resultsReducer'
import selectionreducer from './selectionreducer'
import cartReducer from './cartReducer';
import counterReducer from './counterLength'
import cartPage from '../cartPage';
export default combineReducers({
    News: NewsReducer,
    boardGames: boardGamesReducer,
    results:resultsReducer,
    select:selectionreducer,
    counter:counterReducer,
    cartsssss:cartReducer,
    // cart:cartReducer
});