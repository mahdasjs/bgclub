import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import Myplaylists from '@material-ui/icons/PlaylistPlay';
import { Link } from "react-router-dom";
import {BrowserRouter as Router,Switch, Route,} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Cookie from "js-cookie";
import Homepage from './homepage';
import Producers from './producers';
import Boardgames from './boardgames';
import Search from './search'
import './App.css';
const useStyles = makeStyles({
  root: {
    display:'relative',
    overflowX:'hidden',
    overflow: 'hidden',
    zIndex:9999,
    position: 'fixed',
    bottom:" 0%",
    left:0,
    width: '100%',
    backgroundColor: '#303f9f',

  },
});

export default function LabelBottomNavigation() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  let [state, setState] = useState({
    username: null,
    profilepic:null,
    userid:Cookie.get("userid"),
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const handlePlayprofile = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${state.userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setState({
            profilepic: res.data.user_profile.profile_picture,
            username: res.data.username,
          });
        })
        .catch((error) => {});
    };
    handlePlayprofile();
  }, []);
  return (
<Router>
<Route render={({ location, history }) => (
    <React.Fragment>
 <BottomNavigation  value={value}  onChange={handleChange}>
 <BottomNavigation value={value}                onChange={(selected) => {
                          const to = '/' + selected;
                          if (location.pathname !== to) {
                              history.push(to);
                          }
                      }}  className={classes.root} >

      <BottomNavigationAction label="Home" style={{color:'#fff'}} value="homepage" icon={<Home style={{color:"#fff"}}  />} component={Link} to={'/homepage'} />
      {/* <BottomNavigationAction label="Search" style={{color:"#fff"}} value="search" icon={<Searchicon style={{color:"#fff"}} />} component={Link} to={"/search"}/> */}
      <BottomNavigationAction label="Producers" style={{color:"#fff"}} value="producers" icon={<Myplaylists style={{color:"#fff"}} />}  component={Link} to={'/producers'} />
      <BottomNavigationAction label="Boardgames" style={{color:"#fff"}} value="boardgames" icon={<Myplaylists style={{color:"#fff"}} />}  component={Link} to={'/boardgames'} />
      {/* <BottomNavigationAction label={state.username} style={{color:"#fff"}} value="user" icon={             <Avatar
                  style={{width:30,height:30}}
                  src={state.profilepic}
                   aria-label="recipe">
                  </Avatar> } component={Link} to={'/user/'+Cookie.get('userid')}  /> */}
    </BottomNavigation>
    </BottomNavigation>

        <Switch>
        <Route path="/search" exact component={Search}/>
          <Route path="/homepage" exact component={Homepage} />
          <Route path="/producers" component={Producers} />
          <Route path="/boardgames" exact component={Boardgames} />
          {/* <Route path="/user" exact component={User} />
          <Route path="/user/:id" exact component={User} />
          <Route path="/playlistPage/:id/:username" exact component={playlistPage}/>
          <Route path="/homepage/:username/:id" exact component={homepage}/> */}


        </Switch>
      </React.Fragment>
  )}
/>
</Router>
  );
}
