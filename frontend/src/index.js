import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { bgData, fetchData, postData, resultData,selectedData } from './actions';


const saveState = (state) => {
  if (state.boardGames.length !== 0) {
    localStorage.setItem("state", JSON.stringify(state));
  }
};

const getState = () => {
  try {
    const s = localStorage.getItem("state");

    if (s === null) return undefined;
    return JSON.parse(s);
  } catch (e) {
    return undefined;
  }
};

const initialState = getState();
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
store.dispatch(fetchData());
store.dispatch(bgData());
store.dispatch(resultData());
store.dispatch(selectedData());
store.dispatch(postData());

store.subscribe(() => {
  saveState({
    boardGames: store.getState().boardGames,
    selections: store.getState().selections,
    counter:store.getState().counter,
    comments:store.getState().comments,
    ratings:store.getState().ratings,
    posts:store.getState().posts,
    events:store.getState().events,
    cartPost:store.getState().cartPost,
    cartsssss:store.getState().cartsssss,
  })
})

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
