import React,{Component} from "react";
import {BrowserRouter as Router, Link } from "react-router-dom";
import { Grid, AppBar, Toolbar} from "@material-ui/core"
import SearchICon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const style = theme =>({
  root: {
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
  },
    multilineColor:{
        color:'white'
    },
});
class navbar extends Component{
    constructor(props){
        super(props)
        this.state={
          data: null
        }
      }
      handleChange = (e) => {
        this.setState({ data: e.target.value });
      }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <AppBar position="fixed" style={{zIndex:2010}} color = "primary" >
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={2} sm={2} md={3} lg={9}>
                                <Typography variant='body1' align='left' className="logo" style={{top:15,fontSize:20,fontFamily:'Open Sans'}} >
                                    BGclub
                                </Typography>              
                            </Grid>
                            <Grid item xs={7} sm={7} md={6} lg={2}>
                              <div className={classes.root}>
                                <div className='searchbar'>
                                <TextField onChange={this.handleChange} 
                                            value={this.state.data} 
                                            rowsMin={1}  
                                            InputProps={{
                                                className: classes.multilineColor
                                              }}
                                            rowsMax={1} 
                                            placeholder="search ..." style={{paddingBottom:10, paddingTop:10, fontSize:15, width:'100%'}} />
                                            </div>
                               </div>
                            </Grid>
                            <Router forceRefresh={true}>
                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                <div className='searchbar'>
                                <Link  to = {'/search?q=search_' + this.state.data} >
                                <IconButton className="searchIcon" aria-label="settings" >
                                <SearchICon  style={{color:"#fff"}}/>
                    </IconButton>
                    </Link>
                    </div>
                    </Grid>

                    </Router>


                </Grid>

                </Toolbar>
            </AppBar>
            </div>
        )
    }
}
export default withStyles(style)(navbar);
