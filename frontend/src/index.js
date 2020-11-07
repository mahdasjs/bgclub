import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from './store/store'
import {Provider} from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  </Provider>,

  document.getElementById('root')
);

serviceWorker.unregister();
