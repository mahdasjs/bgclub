import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from './actions/index'
import Typography from '@material-ui/core/Typography';
import CartBorder from '@material-ui/icons/AddShoppingCart';
import Cart from '@material-ui/icons/RemoveShoppingCart';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box } from '@material-ui/core';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie'
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
            <Avatar  src="a" aria-label="recipe" style={{marginLeft:10,width:40,height:40}} >
             
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" >
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
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        src={this.props.data.image}
                        style={{
                          display:'block',
                          maxWidth:'100%',
                          height:'auto',
                          maxHeight:100,
                          marginLeft:10
                      }} 
                        />  
                                          <Typography className='eventname' style={{marginLeft:12}}>

                        {this.props.name.substring(0,25)}
                        </Typography>
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
