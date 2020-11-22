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
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:false,
            counter:0
        }
    }
    handleAdd=(e)=>{
        this.props.dispatch(addToCart({data:this.props.data}))
        // this.props.dispatch(counterPlus({id:this.props.id}))

        console.log(this.props.counter)

        // if(e.target.checked==false){
        //     this.props.dispatch(removeFromCart(this.props.id))
        // }
        // this.setState({checkCart: e.target.checked});
    }
    handleRemove=(e)=>{
        this.props.dispatch(removeFromCart(this.props.id))
        // if(e.target.checked==false){
        //     this.props.dispatch(removeFromCart(this.props.id))
        // }
        // this.setState({checkCart: e.target.checked});

    }
    componentDidMount(){
        for(var i = 0; i<this.props.carts.length; i++){
            if(this.props.id==this.props.carts[i].data.id){
                // this.setState({checkCart:true})
                break;
            }
        }
    }
    render(){
        console.log(this.state.counter)
        return(
            <div>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:223,minWidth:223,maxHeight:270,minHeight:270,marginleft:10,marginRight:10 }}>
                         {/* <FormControlLabel
                        style={{position:'absolute',marginTop:5,marginLeft:150}}
                        label={this.state.checkCart}
                      control={
                        <Checkbox  
                        style={{border:'5px solid rgb(240, 248, 255)',backgroundColor:'rgb(240, 248, 255)'}}
                        checked={this.state.checkCart} 
                        onChange={this.handleCheck}   
                        color="default"  
                       icon={<CartBorder style={{fontSize:30}} />} 
                       checkedIcon={<Cart style={{fontSize:30}}/>}
                      name="checkedH" />}
                   /> */}
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
                        ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 165}}/>  
                                          <Typography className='name'>

                        {this.props.name.substring(0,25)}
                        </Typography>
                        <div className='addAndRemove' style={{backgroundColor:'rgb(240, 248, 255)',borderRadius:100}} >
                        <IconButton aria-label="settings" style={{width:40,height:40,marginRight:5,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    {this.props.carts.len}
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
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
        carts:state.carts,
        counter:state.counter
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
