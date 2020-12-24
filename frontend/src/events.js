import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import {selectedEventData, eventsData, saveSelectValue, selectedData,counterPlus} from './actions/index'
import Typography from '@material-ui/core/Typography';
import { IconButton,Box } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookie from 'js-cookie';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            anchorEl: null,
        }
    }
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    handelDelPost=()=>{
      axios({
        method:'delete',
        url: `http://localhost:8000/api/v1/events/${this.props.id}`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
    }).then( ()=>this.props.dispatch(eventsData(window.location.pathname.split('/')[2]))
    )
      this.handleClose()
    }
    componentDidMount(){
      this.props.dispatch(eventsData(window.location.pathname.split('/')[2]))
    }

    
    render(){
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
        return(
            <div style={{marginLeft:45}}>
                <Card       
                    onClick={()=>this.props.dispatch(selectedEventData(this.props.id))}  
                    style={{marginTop:15, maxWidth:280,minWidth:280,height:'auto',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} >
                              <CardHeader
          avatar={
            <Avatar   src={this.props.data.user.profile_picture} aria-label="recipe" style={{marginLeft:0,width:40,height:40}} >
             
            </Avatar>
          }
          action={
            <div>
            <IconButton aria-label="settings"  onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
             <Menu
                                           anchorEl={anchorEl}
                                           open={open}
                                           onClose={this.handleClose}
                                         >
                                           <MenuItem onClick={this.handelDelPost}>Delete</MenuItem>
                                         </Menu>
                                         </div>
          }
          title={this.props.data.user.username}
        />
                    <CardContent style={{marginTop:-20 }}>
                        <div style={{display:'flex',flexWrap:'nowrap'}}> 
                    <img
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/eventpage/' + this.props.id;
                                }}
                        src={this.props.data.event_pic}
                        style={{
                          display:'block',
                          maxWidth:'100%',
                          height:'auto',
                          maxHeight:100,
                      }} 
                        />  
                        <div style={{flexWrap:'nowrap'}}> 
                                          <Typography className='eventname' style={{marginLeft:12}}>

                        {this.props.data.title.substring(0,15)}
                        </Typography>
                        <Typography style={{marginLeft:12,marginTop:10,fontSize:13,fontWeight:500}}>

starts at {this.props.data.event_date}
</Typography>
<div style={{display:'flex',flexWrap:'nowrap'}}>
<Typography style={{marginLeft:12,marginTop:15,fontSize:11,fontWeight:400}}>
{this.props.data.event_time}
</Typography>
<Button
                        style={{marginTop:10,marginLeft:25}}
        variant="contained"
        size="small"
        color="#fff"
      >
          join
      </Button>
      </div>
</div>
                        </div>
                    </CardContent> 
                </Card>
             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        select: state.select,
        cartsssss:state.cartsssss,
        ratings:state.ratings,
        selectEvent:state.selectEvent
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
