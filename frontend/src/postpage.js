import React from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedData,commentPostData,addCommentPost,addComment, addRating, checkRating} from './actions/index'
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
      handlechangeComment = (e) => {
        this.setState({ comment: e.target.value });
      };
      handlePostComment=(e)=>{
        if(this.state.comment!==null)
        {
        const formData = new FormData();
        formData.append("post",this.state.id);
        formData.append("text",this.state.comment)
        axios({
          method: "post",
          url:createCommentPostApi,
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
          }).then((response) => {
            this.props.dispatch( commentPostData(window.location.pathname.split('/')[2]))

          this.setState({comment:' '})
            })}
            else{
              alert("your comment can't be empty")
            }
      }
      handlechangeRate= (e) => {
        this.setState({ value: e.target.value });
      };
      handleRate=(e)=>{
        this.props.dispatch(checkRating(cookie.get('username'),this.state.id))
        this.props.dispatch(addRating({data:{rate:this.state.value,id:this.state.id,username:cookie.get('username')}}))
      }
      async count(){
        const result = [...this.props.cartPost.reduce( (mp, o) => {
            if (!mp.has(o.data.postid)) mp.set(o.data.postid, { ...o, count: 0 });
            mp.get(o.data.postid).count++;
             if(Cookies.get('username')==o.data.username)
            {
                mp.get(o.data.postid).count++;
            }
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartPost.reduce( (mp, o) => {
            if (!mp.has(o.data.postid)) mp.set(o.data.postid, { ...o, count: 0 });
            if(Cookies.get('username')==o.data.username)
            {
                mp.get(o.data.postid).count++;
            }
            return mp;
        }, new Map).values()];
        console.log(values)
        for(var i=0; i<result.length; i++){
            if(this.state.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
        var value=0
        var counter=0
        const ratingValues = [...this.props.ratings.values()];
        for(var i=0; i<ratingValues.length; i++){
          if(ratingValues[i].data.id===JSON.stringify (this.props.id)){
            counter++
            value=value+parseFloat (ratingValues[i].data.rate)
          }
        }
        await this.setState({rate:value/counter})
        for(var i=0;i<this.props.ratings.length;i++){
          if(this.state.id==this.props.ratings[i].data.id&&cookie.get('username')==this.props.ratings[i].data.username){
             await this.setState({value:this.props.ratings[i].data.rate})
          }
        }
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addPostToCart({data:{description:this.props.select.description,bgid:-1,postid:this.props.select.id,
          image:this.props.select.post_pic,name:this.props.select.bg_name,sell_price:this.props.select.sell_price,
          rent_price:this.props.select.rent_price,number:this.props.select.number,username:Cookies.get('username')}}))
        this.setState({count:this.state.count+1})
    }
    
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removePostFromCart(this.props.select.id))
        this.setState({count:this.state.count-1})

    }
    componentDidMount(){
        this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
        this.props.dispatch( commentPostData(window.location.pathname.split('/')[2]))
        this.count()

    }
    render(){
      console.log(this.props.ratings)
      var value=0
      var counter=0
      const ratingValues = [...this.props.ratings.values()];
      for(var i=0; i<ratingValues.length; i++){
        if(ratingValues[i].data.id===this.state.id){
          counter++
          value=value+parseFloat (ratingValues[i].data.rate)
        }
      }

      let comments = this.props.commentsPost.map(post => {
        return <Postcomments
          avatar={post.user.profile_picture}
          key={post.id}
          id={post.id}
          text={post.text}
          username={post.user.username}
          userid={post.user.id}
          postUser={this.props.postUser}
          />;
      }).reverse();
        return(
            <div className='homepage'>
              <Grid container>
                <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
                </Grid>
                <Grid xs={12} sm={12} lg={5}
                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >            
                    <img
                    src={this.props.select.post_pic}
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
                      {this.props.select.bg_name}
                    </Typography>
                    {this.props.select.sell_price!=""?
                    <Typography className='bgprice'>
                    ${this.props.select.sell_price}

                      </Typography>
                      :                       <Typography className='bgprice'>
                      ${this.props.select.rent_price}
  
                        </Typography>      
    }             
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
                    {this.state.count<this.props.select.number?
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    :
                    <IconButton aria-label="settings" disabled style={{backgroundColor:' rgba(0, 0, 0, 0.1)',width:40,height:40,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={this.handleAdd}    >
                    <Plus  style={{color:"#000"}}/>
        </IconButton>
    }
                    </div>
                      <Typography className='bgdescription'>
                        {this.props.select.description}
                      </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} lg={5}
                        style={{flexWrap:'nowrap', justifyContent: 'left', alignItems: 'left', textAlign: 'left',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                      <Rating  precision={0.1} name="read-only" value={value/counter} readOnly size="large"  />
                      <Typography className='bgdescription'>

                      {counter} votes
                                            </Typography>

                  </Grid>
                  <Grid style={{display:'flex',flexWrap:'nowrap',marginLeft:'30px'}}  container item xs={12} sm={12} lg={12}>
                    <Grid item xs={10} sm={10} lg={10} >
                      <div style={{ display:'flex',flexWrap:'nowrap',width:'115%'}}>
                        <TextareaAutosize value={this.state.comment} onChange={this.handlechangeComment} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Add comment..." 
                            style={{borderStyle:'hidden',  outline:'none',backgroundColor:"rgb(245, 250, 252)", padding:10,  fontSize:15, width:'100%'}}/>
                      </div>
                    </Grid>
                    <Grid  item xs={2} sm={2} lg={2} style={{marginLeft:100}}>
                      <Button onClick={this.handlePostComment}  color="primary">
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid  item xs={12} sm={12} lg={12}  style={{marginLeft:'30px',marginTop:10}} >
                  <PerfectScrollbar>
                    {comments}
                  </PerfectScrollbar>
                </Grid>
                <If condition ={this.state.showAll===false}>
                  <Grid  item xs={12} sm={12} lg={12}  style={{marginTop:10, visibility:this.state.visibility}}>
                    {comments[0]}
                    {/* {comments[this.state.commentArrayLength-2]} */}
                  </Grid>
                </If>
                <If  condition ={comments.length>1 &&this.state.showAll===false}>
                  <Grid  item xs={12} sm={12} lg={12} style={{ visibility:this.state.visibility}}>
                    <Button 
                    onClick={this.showAll}
                    variant="body1"
                    align="justify"
                    style={{
                      display:'table',
                      marginRight:'auto',
                      marginLeft:'auto',
                    fontSize: 12,
                    fontSize:13,
                    marginBottom:-20,
                    color:'rgba(0, 0, 0, 0.4)'
                    }}
                    >
                      show more                    
                    </Button>
                  </Grid>
                </If>  
                <If  condition ={comments.length>1 && this.state.showAll===true}>
                  <Grid  item xs={12} sm={12} lg={12} style={{ visibility:this.state.visibility}}>
                    <Button
                    // onClick={this.linkPost}
                    onClick={this.showAll}
                    variant="body1"
                    align="justify"
                    style={{
                      display:'table',
                      marginRight:'auto',
                      marginLeft:'auto',
                    fontSize: 12,
                    fontSize:13,
                    marginBottom:-20,
                    color:'rgba(0, 0, 0, 0.4)'
                    }}
                    >
                      show less                    
                    </Button>
                  </Grid>
                </If>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      select: state.select,
      cartsssss:state.cartsssss,
      commentsPost:state.commentsPost,
      ratings:state.ratings,
      cartPost:state.cartPost
    }
  }
export default connect(mapStateToProps, null)(boardgames);