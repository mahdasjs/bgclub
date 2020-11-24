import React,{Component} from 'react';
import image from './back.jpg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box } from '@material-ui/core';
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from './actions/index'
class news extends Component{
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:this.props.data}))
        this.setState({count:this.props.count+1})
    }
    render(){
        return(
            <div style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}}>
                      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
                <CardMedia
                    image={this.props.data.image}
                    style={{marginRight:20, maxHeight: 60, maxWidth: 60, minWidth: 60, minHeight: 60}}/>   
                  <Typography className='titleCart'>
                    {this.props.name}
                    </Typography>
                    <Typography className='priceCart'>
                    {this.props.data.price}
                    </Typography>
                    <div className="addCart" style={{backgroundColor:'rgb(240, 248, 255)',borderRadius:100}} >
                        <IconButton aria-label="settings" style={{width:40,height:40,marginRight:5,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    {this.props.count}
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    </div>
                </CardContent> 
               
         </div>
        )
    }
}
export default news
