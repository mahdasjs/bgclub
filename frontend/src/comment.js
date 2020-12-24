import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/Delete';
import Cookie from 'js-cookie';
import axios from 'axios'
import { If } from 'rc-if-else';
const theme = createMuiTheme({
    typography: {
      body1: {
        fontFamily:(     'Open Sans'),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component {  
    constructor(props){
      super(props);
      this.state={
        userid:Cookie.get("userid"),
        username:Cookie.get("username"),

      }
    }
    componentDidMount() {
      console.log(this.props.username,this.state.username)
    }
    render(){
      return(
          <div>
           {/* <Card
                style={{backgroundColor:"rgba(0, 0, 0, 0.01)" ,margin:5}}>   */}
                  <Grid container>
                    <Grid style={{display:'flex',flexWrap:'nowrap',marginTop:5}} item xs={11} sm={11} md={11} lg={10}>
                <Avatar
                src={this.props.avatar}
                      style={{
                        width: 30,
                        height: 30
                      }}
                                    //   src={this.props.avatar}
              ></Avatar>
          <Typography variant='body1' align='left' style={{marginLeft:5,marginTop:0,fontSize:18,fontFamily:'Open Sans'}} >
          {this.props.username}<span style={{ fontSize:13}}> {this.props.text}</span>
          </Typography>
          </Grid>
          {/* <If condition={this.props.username===this.state.username}>
          <Grid xs={1} sm={1} ms={1} lg={2}>
            <IconButton onClick={this.del}>
            <MoreVertIcon />
            </IconButton>
          </Grid>
          </If>
         */}
          </Grid>

          <Divider style={{marginTop:5,marginBottom:5,width:'90%'}}/>
          {/* </Card> */}
  </div>
);
      }
    }
export default post;