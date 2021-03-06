import React,{Component} from 'react';
import image from './back.jpg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import { IconButton,Box } from '@material-ui/core';
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import {addPostToCart, removePostFromCart} from './actions/index'
class news extends Component{
    constructor(){
        super()
        this.state={
            counter:[],
            count:0,
            limitation:10,
        }
    }
    async count(){
        const result = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.postid)) mp.set(o.data.postid, { ...o, count: 0 });
            mp.get(o.data.postid).count++;
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.postid)) mp.set(o.data.postid, { ...o, count: 0 });
            mp.get(o.data.postid).count++;
            return mp;
        }, new Map).values()];
        for(var i=0; i<result.length; i++){
            if(this.props.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
        var value=0
        var counter=0
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addPostToCart({data:this.props.data}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removePostFromCart(this.props.id))
        this.setState({count:this.state.count-1})

    }

    render(){
        return(
            <div style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `,border:'1px solid rgba(0, 0, 0, 0.1) ',marginTop:5}}>
                      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
                <CardMedia
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href='/bgpage/' + this.props.id;
                                    }}
                    image={this.props.data.image}
                    style={{marginRight:20, maxHeight: 60, maxWidth: 60, minWidth: 60, minHeight: 60}}/>   
                  <Typography className='titleCart'>
                    {this.props.name}
                    </Typography>
                    {this.props.data.sell_price!=""?
                    <Typography className='priceCart'>
                    ${this.props.data.sell_price}
                    </Typography>
                    :                    <Typography className='priceCart'>
                    ${this.props.data.rent_price}
                    </Typography>
                    }
                      {this.props.data.sell_price!=""?
                       <div className='carttagstyle'>
                       On Sell
                     </div>
                     :             
                      <div className='carttagstyle' style={{backgroundColor:'rgba(240, 16, 16, 0.4)'}}>
                     On Rent
                   </div>
                    }
                    <div className='addAndRemoveFromCart' style={{borderRadius:100}} >
                          {this.props.count!=0?
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    :   <IconButton aria-label="settings" disabled  style={{backgroundColor:' rgba(0, 0, 0, 0.1)', width:40,height:40,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                    <Minus  style={{color:"#000"}}/>
        </IconButton>
    }
                    {this.props.count}
                    {this.props.count<this.props.number?
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    :
                    <IconButton aria-label="settings" disabled style={{backgroundColor:' rgba(0, 0, 0, 0.1)',width:40,height:40,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                    <Plus  style={{color:"#000"}}/>
        </IconButton>
    }
                    </div>
                </CardContent> 
               
         </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        News: state.News,
        cartsssss:state.cartsssss,
        cartPost:state.cartPost
    };
  };
export default connect(mapStateToProps, null)(news);