import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import homepage from "./homepage";
import axios from 'axios';
import Cookie from 'js-cookie'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import  {
  ListItemSecondaryAction,
} from "material-ui/List";
import HomeIcon from '@material-ui/icons/Home';
import PlaylistIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import Avatar from "@material-ui/core/Avatar";
import Logout from '@material-ui/icons/ExitToApp';
import { createMuiTheme } from '@material-ui/core/styles';
import Boardgames from './boardgames';
import Cafes from './cafes';
import Boardgamespage from './boardgamepage';
import Eventpage from './eventpage';
import Producers from './producers';
import Welcome from './Welcome';
import Search from './search';
import User from "./Profile/User";
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import CartPage from "./cartPage";
const theme = createMuiTheme({
  typography: {
    body1: {
      fontFamily:( "opensans"),
      fontWeight: 500,
    },
  },
});
const drawerWidth = 240;

const styles = theme => ({
  root: {
    fontFamily:'Open Sans',
    display: 'flex',
  },
  appBar: {
    fontFamily:'Open Sans',
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    fontFamily:'Open Sans',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    fontFamily:'Open Sans',
    width: drawerWidth,

  },
  toolbar: theme.mixins.toolbar,
  content: {
    fontFamily:'Open Sans',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class PersistentDrawerLeft extends React.Component {
  constructor(props){
      super(props)
      this.state={
        id:null,
        open: true,
        expanded:false,
        username:null,
        userprofile:null
      }
    }
    handleClick=()=> {
      Cookie.remove('token');
      Cookie.remove('userid')
      Cookie.remove('url')
      Cookie.remove('username')
    }
    render(){
      const { classes, theme } = this.props;
      const { open } = this.state;
      return(

        <Router forceRefresh={true}
        >
          <Route render={({ location, history }) => (
              <React.Fragment>
                   <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography  align='center' style={{fontFamily:'Open Sans',fontSize:30,marginTop:4,marginBottom:8}}>
              BgClub
            </Typography>
          </div>
          <List>
              <ListItem style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} button key={'Homepage'} component={Link} to={'/homepage'}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Homepage
                            </Typography>              </ListItem>
              <ListItem button key={'Profile'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/user/'+Cookie.get('userid')} >
                <ListItemIcon>
                <Avatar
                                  style={{width:30,height:30}}

                  src={this.state.userprofile}
                   aria-label="recipe">
                  </Avatar>           </ListItemIcon>
                <ListItemText style={{fontFamily:'Open Sans'}} primary={'Profile'}  />
              </ListItem>
        <ListItem button key={ 'Playlists'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}}  component={Link} to={`/producers `}>
                <ListItemIcon>
                    <PlaylistIcon />
                </ListItemIcon>
                <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Producers
                            </Typography>              </ListItem>
      <ListItem button key={ 'Create playlist'}  style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/boardgames'}>
        <ListItemIcon>
            <PlaylistIcon />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Boardgames
                            </Typography>
      </ListItem>       
      <ListItem button key={ 'Create playlist'}  style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/cafes'}>
        <ListItemIcon>
            <PlaylistIcon />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            cafes
                            </Typography>
      </ListItem>    
      <ListItem button key={ 'Create playlist'}  style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/cart'}>
        <ListItemIcon>
            <ShoppingCart />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Cart
                            </Typography>
      </ListItem>
              <ListItem button key={ 'logout'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} onClick={this.handleClick}  component={Link} to={'/'}>
        <ListItemIcon>
            <Logout />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Logout
                            </Typography>      </ListItem>
          </List>
        </Drawer>
                  <Switch >
                  <Route path="/bgpage/:id" exact component={Boardgamespage} />
                  <Route path="/eventpage/:id" exact component={Eventpage} />
                  <Route  path="/homepage" exact component={homepage} />
                   <Route path="/homepage/:username/:id" exact component={homepage} />
                   <Route path="/producers" component={Producers} />
                   <Route path="/cafes" component={Cafes} />
                    <Route path="/user/:id" exact component={User} />
                    <Route path="/boardgames"  component={Boardgames} />
                    <Route path="/search" exact component={Search}/>
                    <Route path="/cart" exact component={CartPage}/>
                  </Switch>
                </React.Fragment>
            )}
          />
      </Router>

    );
  }
}
export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);