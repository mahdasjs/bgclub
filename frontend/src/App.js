import React from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import Homepage from './homepage';
import Navbar from './navbar';
import Sidebar from './sidebar'
import Producers from './producers';
import Boardgames from './boardgames';
import Search from './search'
import './App.css';
import Login from './Login/Login.js';
import Welcome from "./Welcome.js";
import Bottombar from './bottombar'
import User from "./Profile/User";
import ToDO from "./pages/todo";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
function App() {
  return (
    <div >
      <ReduxProvider store={reduxStore}>
              <Router forceRefresh={true}> 
        <Switch>
        <Route path="/" exact component={Welcome}>
                </Route>
                <Route path="/login" exact component={Login}>
                </Route>
                <Route path="/user" exact component={User}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path="/homepage" exact component={Homepage}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path="/producers" exact component={Producers}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path="/boardgames" exact component={Boardgames}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path ="/search" exact component={Search}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
        </Switch>
      </Router>
      <ToDO />
      </ReduxProvider>
    </div>
  );
}

export default App;
