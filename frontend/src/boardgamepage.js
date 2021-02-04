import React from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {removeFromCart,commentPostData,addCommentPost,addComment, addRatingBG, checkRatingBG, selectedBGData, addToCart} from './actions/index'
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import { IconButton} from '@material-ui/core';
import axios from 'axios';
import Postcomments from './comment';
import {If} from 'rc-if-else';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {addPostToCart,removePostFromCart} from './actions/index'
import cookie from 'js-cookie'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'
import {createCommentPostApi} from './api/apis'
class boardgames extends React.Component{
      constructor(){
        super()
        this.state={
          value:0,
          hover:-1,
          count:0,
          id:window.location.pathname.split('/')[2],
          comment:null,
          visibility:'hidden',
          toggle:false,
          showAll:false,
        }
      }
      handlechangeRate= (e) => {
        this.setState({ value: e.target.value });
      };
      handleRate=(e)=>{
        this.props.dispatch(checkRatingBG(cookie.get('username'),this.state.id))
        this.props.dispatch(addRatingBG({data:{rate:this.state.value,id:this.state.id,username:cookie.get('username')}}))
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
          if(this.state.id==result[i]){
              await this.setState({count:values[i].count})
          }
      }
        var value=0
        var counter=0
        const ratingValues = [...this.props.ratingsBG.values()];
        for(var i=0; i<ratingValues.length; i++){
          if(ratingValues[i].data.id===JSON.stringify (this.state.id)){
            counter++
            value=value+parseFloat (ratingValues[i].data.rate)
          }
        }
        await this.setState({rate:value/counter})
        for(var i=0;i<this.props.ratingsBG.length;i++){
          if(this.state.id==this.props.ratingsBG[i].data.id&&cookie.get('username')==this.props.ratingsBG[i].data.username){
             await this.setState({value:this.props.ratingsBG[i].data.rate})
          }
        }
    }
    handleAdd=(e)=>{
      this.count();
      this.props.dispatch(addToCart({data:this.props.selectBG}))
      this.setState({count:this.state.count+1})
  }
  handleRemove=(e)=>{
      this.count();
      this.props.dispatch(removeFromCart(this.state.id))
      this.setState({count:this.state.count-1})

  }

    componentDidMount(){
        this.props.dispatch( selectedBGData(window.location.pathname.split('/')[2]))
        this.count()
    }
    render(){
      console.log(this.props.ratings)
      var value=0
      var counter=0
      const ratingValues = [...this.props.ratingsBG.values()];
      for(var i=0; i<ratingValues.length; i++){
        if(ratingValues[i].data.id===this.props.selectBG.id){
          counter++
          value=value+parseFloat (ratingValues[i].data.rate)
        }
      }

    
        return(
            <div className='homepage'>
              <Grid container>
                <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
                </Grid>
                <Grid xs={12} sm={12} lg={5}
                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >            
                    <img
                    src={this.props.selectBG.image}
                    style={{
                      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                      maxWidth:'100%',
                      height:'auto',
                      maxHeight:350          
                    }}
                    />
                </Grid>
                <Grid xs={12} sm={12} lg={6}
                      style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left' ,marginTop:'30px',marginLeft:'30px'}} >
                   <Typography className='bgname'>
                      {this.props.selectBG.name}
                    </Typography>
                    <Typography className='bgprice'>
                    ${this.props.selectBG.price}

                      </Typography>     
                      <div>
                      <Rating
                        onClick={this.handlechangeRate}
                        value={this.state.value}
                        precision={0.5}
                      />
                      <Button onClick={this.handleRate}  color="primary">
                        Rate
                      </Button>
                  </div>
                      
                  <div className='addAndRemoveID' style={{borderRadius:100}} >
                          {this.state.count!=0?
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    :   <IconButton aria-label="settings" disabled  style={{backgroundColor:' rgba(0, 0, 0, 0.1)', width:40,height:40,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={this.handleRemove} >
                    <Minus  style={{color:"#000"}}/>
        </IconButton>
    }
                    {this.state.count}
                    <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    </div>
                      <Typography className='bgdescription'>
                        {this.props.selectBG.description}
                      </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} lg={5}
                        style={{flexWrap:'nowrap', justifyContent: 'left', alignItems: 'left', textAlign: 'left',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                      <Rating  precision={0.1} name="read-only" value={value/counter} readOnly size="large"  />
                      <Typography className='bgdescription'>

                      {counter} votes
                                            </Typography>

                  </Grid>
                </Grid>
              
             
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      selectBG: state.selectBG,
      cartsssss:state.cartsssss,
      commentsPost:state.commentsPost,
      ratingsBG:state.ratingsBG,
      cartPost:state.cartPost
    }
  }
export default connect(mapStateToProps, null)(boardgames);