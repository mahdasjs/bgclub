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
const names = [{data:{id:0}},{data:{id:0}},{data:{id:0}},{data:{id:1}}];

const result = [...names.reduce( (mp, o) => {
    if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
    mp.get(o.data.id).count++;
    return mp;
}, new Map).values()];

console.log(result);
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:false,
            counter:[],
            count:0
        }
    }
    async count(){
        const result = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).values()];
        for(var i=0; i<result.length; i++){
            if(this.props.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:this.props.data}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removeFromCart(this.props.id))
        this.setState({count:this.state.count-1})

    }

    componentDidMount(){
        this.count()
    }
    
    render(){
        return(
            <div>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:223,minWidth:223,maxHeight:270,minHeight:270,marginleft:10,marginRight:10 }}>
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
                        <IconButton aria-label="settings" style={{width:40,height:40,marginRight:0,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    {this.state.count}
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:0,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
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
        cartsssss:state.cartsssss,
        counter:state.counter
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
