import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {addPostToCart, selectedData,removePostFromCart} from './actions/index'
import Typography from '@material-ui/core/Typography';
import CartBorder from '@material-ui/icons/AddShoppingCart';
import Cart from '@material-ui/icons/RemoveShoppingCart';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box, Grid } from '@material-ui/core';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:false,
            counter:[],
            count:0,
            rate:0,
        }
    }
    async count(){
        const result = [...this.props.cartPost.reduce( (mp, o) => {
            if (!mp.has(o.data.postid)) mp.set(o.data.postid, { ...o, count: 0 });
            mp.get(o.data.postid).count++;
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartPost.reduce( (mp, o) => {
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
        const ratingValues = [...this.props.ratings.values()];
        for(var i=0; i<ratingValues.length; i++){
          if(ratingValues[i].data.id===this.props.id){
            counter++
            value=value+parseFloat (ratingValues[i].data.rate)
          }
        }
        await this.setState({rate:value/counter})
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addPostToCart({data:{description:this.props.data.description,bgid:-1,postid:this.props.data.id,
          image:this.props.data.post_pic,name:this.props.data.bg_name,sell_price:this.props.data.sell_price,
          rent_price:this.props.data.rent_price,number:this.props.data.number,username:Cookies.get('username')}}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removePostFromCart(this.props.id))
        this.setState({count:this.state.count-1})

    }

    componentDidMount(){
      console.log(this.props.cartsssss)
        this.count()
    }
    
    render(){
        return(
            <div style={{marginLeft:45}}>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:280,minWidth:280,maxHeight:400,minHeight:400}}>
                              <CardHeader
          avatar={
            <Avatar  src="a" aria-label="recipe" style={{marginLeft:10}} >
             
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" >
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.user.username}
        />
                    <CardContent style={{marginTop:-20}}>
                      {this.props.data.sell_price!=""?
                       <div className='tagstyle'>
                       On Sell
                     </div>
                     :             
                      <div className='tagstyle' style={{backgroundColor:'rgba(240, 16, 16, 0.4)'}}>
                     On Rent
                   </div>
                    }
                     
                    <img
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        src={this.props.data.post_pic}
                        style={{
                          display:'block',
                          margin:'0 auto',
                          maxWidth:'100%',
                          height:'auto',
                          maxHeight:220
                      }} 
                        // style={{marginTop:-13,
                        // maxHeight: 230, maxWidth: 300, minWidth: 300, minHeight: 230}}
                        />  
                        <Grid container style={{display:'flex',flexWrap:'nowrap'}}>
                        <Grid lg={6}>
                                          <Typography className='name' style={{marginLeft:12}}>

                        {this.props.name.substring(0,12)}
                        </Typography>
                        </Grid>
                        <Grid lg={6}>

                        {this.props.data.sell_price!=""?
                        <Typography className='name' style={{marginLeft:12}}>

                        ${this.props.data.sell_price}
                        </Typography>
                        :                        <Typography className='name' style={{marginLeft:12}}>

                        ${this.props.data.rent_price}
                        </Typography>
    }
                            </Grid>
                            </Grid>

                        <div style={{marginTop:10,marginLeft:10}}>
                        <Rating  precision={0.1} name="read-only" value={this.state.rate} readOnly size="small"  />
                        </div>
                        <div className='addAndRemove' style={{borderRadius:100}} >
                          {this.state.count!=0?
                        <IconButton aria-label="settings" style={{width:30,height:30,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    :   <IconButton aria-label="settings" disabled  style={{backgroundColor:' rgba(0, 0, 0, 0.1)', width:30,height:30,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                    <Minus  style={{color:"#000"}}/>
        </IconButton>
    }
                    {this.state.count}
                    {this.state.count<this.props.data.number?
                        <IconButton aria-label="settings" style={{width:30,height:30,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    :
                    <IconButton aria-label="settings" disabled style={{backgroundColor:' rgba(0, 0, 0, 0.1)',width:30,height:30,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                    <Plus  style={{color:"#000"}}/>
        </IconButton>
    }
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
        posts:state.posts,
        cartPost:state.cartPost
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
