import React from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedData,addToCart,removeFromCart,addComment, addRating, checkRating} from './actions/index'
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
import cookie from 'js-cookie'
class boardgames extends React.Component{
      constructor(){
        super()
        this.state={
          value:2,
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
            this.props.dispatch(addComment({data:{comment:this.state.comment,id:this.state.id,username:cookie.get('username')}}))
            this.setState({comment:' '})
            const formData = new FormData();
            formData.append("post",this.state.id);
            formData.append("text",this.state.comment)
            axios({
              method: "post",
              url: "https://5faaa726b5c645001602af7e.mockapi.io/api/v1/new",
              headers: { 
                "Content-type": "multipart/form-data"},
                data:formData
            })
          }
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
        for(var i=0;i<this.props.ratings.length;i++){
          if(this.state.id==this.props.ratings[i].data.id&&cookie.get('username')==this.props.ratings[i].data.username){
             await this.setState({value:this.props.ratings[i].data.rate})
          }
        }
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:this.props.select}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removeFromCart(this.state.id))
        this.setState({count:this.state.count-1})
    }
    componentDidMount(){
        this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
        this.count()
    }
    render(){
      console.log(this.props.ratings)
      var value=0
      const ratingValues = [...this.props.ratings.values()];
      for(var i=0; i<ratingValues.length; i++){
        value=value+parseFloat (ratingValues[i].data.rate)
        console.log(value)
      }
      console.log(value/ratingValues.length)

      let comments = this.props.comments.map(post => {
        if(post.data.id==this.state.id){
          return <Postcomments
          avatar={'post.user.profile_picture'}
          id={post.data.id}
          text={post.data.comment}
          username={post.data.username}
          />;
        }
      });
        return(
            <div className='homepage'>
              <Grid container>
                <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
                </Grid>
                <Grid xs={12} sm={12} lg={5}
                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >            
                    <img
                    src={this.props.select.image}
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
                      {this.props.select.name}
                    </Typography>
                    <Typography className='bgprice'>
                      {this.props.select.price}
                        <div>
                            <Rating
                              name="hover-feedback"
                              value={this.state.value}
                              precision={0.5}
                              onChange={this.handlechangeRate}
                            />
                            <Button onClick={this.handleRate}  color="primary">
                              Rate
                            </Button>
                            <div className='addAndRemove' style={{backgroundColor:'rgb(240, 248, 255)',borderRadius:100}} >
                              <IconButton aria-label="settings" style={{width:40,height:40,marginRight:0,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                    <Minus  style={{color:"#000"}}/>
                                </IconButton>
                                {this.state.count}
                                <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:0,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
                                  <Plus  style={{color:"#000"}}/>
                                </IconButton>
                            </div>
                        </div>
                      </Typography>
                      <Typography className='bgdescription'>
                        {this.props.select.description}
                      </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} lg={5}
                        style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                      <Rating  precision={0.1} name="read-only" value={value/ratingValues.length} readOnly size="large"  />
                  </Grid>
                  <Grid style={{display:'flex',flexWrap:'nowrap', visibility:this.state.visibility,marginLeft:'30px' }}  container item xs={12} sm={12} lg={12} style={{marginBottom:100}}>
                    <Grid item xs={10} sm={10} lg={10} >
                      <div style={{ display:'flex',flexWrap:'nowrap',width:'100%'}}>
                        <TextareaAutosize value={this.state.comment} onChange={this.handlechangeComment} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Add comment..." 
                            style={{borderStyle:'hidden',  outline:'none',backgroundColor:"rgb(245, 250, 252)", padding:10,  fontSize:15, width:'100%'}}/>
                      </div>
                    </Grid>
                    <Grid  item xs={2} sm={2} lg={2}>
                      <Button onClick={this.handlePostComment}  color="primary">
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid  item xs={12} sm={12} lg={12}  >
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
      comments:state.comments,
      ratings:state.ratings
    }
  }
export default connect(mapStateToProps, null)(boardgames);