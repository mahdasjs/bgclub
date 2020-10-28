import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Button from '@material-ui/core/Button';
import "./style.css";
import SignUpContainer from "./Registercafe/SignUpContainer";
import SignUpContainer1 from "./Registeruser/SignUpContainer1";
import SignUpContainer2 from "./Registerproducer/SignUpContainer2";
import Login from "./Login/Login";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    backgroundColor:
    "rgba(0,0,255,0.1)",
    backgroundSize: "cover",
    minWidth: "100%",
    minHeight: "100vh",
    //backgroundImage: url("/back.jpg"),
    // flexbasis: 0,
    // position: " relative",
   
  },
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BrowserRouter>
      <div className={classes.root}>
        <div className="roxFlex">
          <Grid container direction="column" spacing={0}>
            <Grid item xs>
              <div className="newbox">
                <h1 style={{ color: "#0278ae", fontSize: 30 ,marginTop:100}}>
                  Bgclub <SportsEsportsIcon style={{ fontSize: 30  }} />
                </h1>
                
                <h2 style={{ color: "grey", fontSize: 20 }}>
                Welcome to boardgames world!
                <br/>
                  join us and enjoy!
                </h2>
                <br/>
              </div>
            </Grid>
            
             <img
              style={{
                minHeight: "400px",
                width: "80%",
                
               marginTop: "-30px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              alt="bg"
              src="bg.jpg"
            /> 
          </Grid>
          <NoSsr className="roxSignUpLoginContainer">
            <Paper className="fakingroot" elevation={0} style={{ backgroundColor:
    "rgba(255,255,255,0.1)"}}>

                <h2 style={{ color: "grey", fontSize: 20 }}>
                  {" "}
                  Signup as a 
                </h2>
              <AppBar position="static">
                <Tabs
                  tabItemContainerStyle={{ bottom: "4" }}
                  style={{ background: " rgb(48,63,159, 0.8)" }}
                  variant="fullWidth"
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  aria-label="full width tabs
                    example"
                  centered
                >
                  <Tab label="User" component={Link} to="/" />
                  <Tab label="Producer" component={Link} to="/ProducerRegister" />
                  <Tab label="Cafe" component={Link} to="CafeRegister" />
                </Tabs>
              </AppBar>
              <Switch>
                <Route exact path="/" component={SignUpContainer1} />
                <Route path="/CafeRegister" component={SignUpContainer} />
                <Route path="/ProducerRegister" component={SignUpContainer2} />
                 <Route path="/login" component={Login} /> 
              </Switch>
              <h2 style={{ color: "grey", fontSize: 14 }}>
                  Do you have an account ?
             
                  {/* <Button color="primary">Primary</Button> */}
                  <Button size="small" onClick={() => {window.location.href='/login'}}>Login</Button>
                  {/* <Button onClick={() => { alert('clicked') }}>Login</Button> */}
                  </h2>

            </Paper>
          </NoSsr>
        </div>
        </div>
        {/* </Grid> */}
        {/* </Grid> */}
      </BrowserRouter>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
