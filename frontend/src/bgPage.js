import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {addToCart, removeFromCart, saveSelectValue, selectedData} from './actions/index'
import Typography from '@material-ui/core/Typography';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box } from '@material-ui/core';
import Axios from 'axios';
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:true
        }
    }
    componentDidMount(){
        for(var i = 0; i<this.props.cart.length; i++){
            if(this.props.id==this.props.cart[i].data.id){
                this.setState({checkCart:false})
                break;
            }
        }
    }
    render(){
        console.log(this.props.cart)
        return(
            <div>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:223,minWidth:223,maxHeight:260,minHeight:260,marginleft:10,marginRight:10 }}>
                        {this.state.checkCart?
                            <IconButton  
                        onClick={()=>this.props.dispatch(addToCart({data:this.props.data}))}
                        style={{position:'absolute', border:'5px solid rgb(240, 248, 255)',marginTop:5,marginLeft:150,backgroundColor:'rgb(240, 248, 255)'}}>
                         <AddCart />
                        </IconButton>
                        :                           
                         <IconButton  
                         onClick={()=>this.props.dispatch(removeFromCart(this.props.id))}
                        style={{position:'absolute', border:'5px solid rgb(240, 248, 255)',marginTop:5,marginLeft:150,backgroundColor:'rgb(240, 248, 255)'}}>
                         <RemoveCart />
                        </IconButton>
                        }
                    <CardContent>
                    <CardMedia
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        image={this.props.data.image}
                        style={{
                            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                            display:'flex'
                        ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 175}}/>  
                                          <Typography className='name'>

                        {this.props.name.substring(0,30)}
                        </Typography>
                    </CardContent> 
                </Card>
             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        select: state.select,
        cart:state.cart
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
