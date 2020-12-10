import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from './actions/index'
import Typography from '@material-ui/core/Typography';
import { IconButton,Box } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';

class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:false,
            counter:[],
            count:0,
            rate:0,
            limitation:10,
        }
    }

    componentDidMount(){
    }
    
    render(){
        return(
            <div style={{marginLeft:45}}>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:280,minWidth:280,height:'auto',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} >
                              <CardHeader
          avatar={
            <Avatar  src="a" aria-label="recipe" style={{marginLeft:0,width:40,height:40}} >
             
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" style={{marginLeft:80}} >
              <MoreVertIcon />
            </IconButton>
          }
          title={Cookies.get('username')}
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
        ratings:state.ratings
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
