import React from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import Homepage from './homepage';
import Navbar from './navbar';
import Sidebar from './sidebar'
import Producers from './producers';
import Boardgames from './boardgames';
import Boardgamespage from './boardgamepage';
import Eventspage from './eventpage';
import Postpage from './postpage';
import Search from './search'
import Cafes from './cafes'
import './App.css';
import Login from './Login/Login.js';
import Welcome from "./Welcome.js";
import Bottombar from './bottombar'
import Cart from './cartPage'
import User from "./Profile/User";
import Cookie from 'js-cookie';

function App() {
  return (
    <div >
              <Router forceRefresh={true}> 
        <Switch>
        <Route path="/" exact component={Welcome}>
                </Route>
                <Route path="/login" exact component={Login}>
                </Route>
                {Cookie.get('token')!==undefined?
                                <div>

                <Route path="/user/:id" exact component={User}>
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
          <Route path="/bgpage/:id" exact component={Boardgamespage}>
            <Boardgamespage/>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path="/postpage/:id" exact component={Postpage}>
            <Postpage/>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path="/eventpage/:id" exact component={Eventspage}>
            <Eventspage/>
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
          <Route path ="/cafes" exact component={Cafes}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          <Route path ="/cart" exact component={Cart}>
            <Navbar/>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className='bottombar'>
              <Bottombar/>
            </div>
          </Route>
          </div>
                :
                  <Redirect to="/">
                  </Redirect>
                }
        </Switch>
      </Router>

    </div>
  );
}

export default App;