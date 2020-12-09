import React from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedData,addToCart,removeFromCart,addComment, addRating, checkRating} from './actions/index'
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import { IconButton} from '@material-ui/core';
import axios from 'axios';
import Postcomments from './comment';
import {If} from 'rc-if-else';
import PerfectScrollbar from 'react-perfect-scrollbar'
import cookie from 'js-cookie'
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CheckIcon from "@material-ui/icons/Check";

class eventpage extends React.Component{
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
          limitation:10,
          openMemberPopUp:false
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
    handleClickMembers=()=>{
      this.setState({openMemberPopUp: !this.state.openMemberPopUp})

    }
    handleClosePopUp=()=>{
      this.setState({openMemberPopUp: !this.state.openMemberPopUp})
    }
    componentDidMount(){
        this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
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
            <div className='eventpage'>
              <Grid container>
                <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
                </Grid>
                <Grid xs={12} sm={12} lg={5}
                  style={{backgroundColor:'#fff' ,marginTop:'30px',marginLeft:30}} >            
                    <img
                    src={this.props.select.image}
                    style={{
                      maxWidth:'100%',
                      height:'auto',
                      maxHeight:350          
                    }}
                    />
                </Grid>
                <Grid xs={12} sm={12} lg={6}
                      style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left' ,marginTop:'30px'}} >
                   <Typography className='bgname'>
                      {this.props.select.name}
                    </Typography>
                    <Typography >
                        by username
                    </Typography>
                     <Typography className='bgdescription'>
                        {this.props.select.description}
                      </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} lg={12} style={{display:'flex',flexWrap:'nowrap',marginLeft:30,marginTop:20}}>
                          <Grid  lg={6} style={{display:'flex',flexWrap:'nowrap'}} >
                      <Typography className='bgdescription' style={{marginTop:15}}>
                        memebers         
                      </Typography>
                      <Avatar style={{marginLeft:10,width:55,height:55}}></Avatar>
                      <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                      <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                      <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                      <Typography className='bgdescription' style={{marginTop:15}} onClick={this.handleClickMembers}>
                        + 6 more         
                      </Typography>
                      </Grid>
                      <Grid  lg={6}  style={{display:'flex',flexWrap:'nowrap'}} >

                      <div className='raisedTag' style={{borderRadius:5,marginLeft:232,width:90,height:40,marginTop:13}}>
                      <Typography style={{marginTop:10,fontSize:15,marginLeft:10}}>
                        only 4 left      
                      </Typography>
                      </div>
                      <div>
                      <Button
                        style={{marginTop:15,marginLeft:20,minWidth:90,height:40}}
        variant="contained"
        size="small"
        color="#fff"
      >
          join
      </Button>
      </div>
                      </Grid>
                  </Grid>
                  <Grid style={{display:'flex',flexWrap:'nowrap',marginLeft:'30px',marginTop:20}}  container item xs={12} sm={12} lg={12}>
                    <Grid item xs={10} sm={10} lg={11} >
                      <div style={{ display:'flex',flexWrap:'nowrap',width:'94%'}}>
                        <TextareaAutosize value={this.state.comment} onChange={this.handlechangeComment} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Add comment..." 
                            style={{borderStyle:'hidden',  outline:'none',backgroundColor:"rgb(245, 250, 252)", padding:10,  fontSize:15, width:'100%'}}/>
                      </div>
                    </Grid>
                    <Grid  item xs={2} sm={2} lg={1} style={{marginLeft:-35}}>
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
                <Dialog
                          style={{zIndex:100000000}}
                          open={this.state.openMemberPopUp}
                          onClose={this.handleClosePopUp}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" }}
                            id="draggable-dialog-title"
                          >
                            Members
                          </DialogTitle>
                          <DialogContent>
                            {this.props.cartsssss.map((item) => (
                              <Card
                                key={item.id}
                                style={{
                                  backgroundColor: "white",
                                  maxWidth: 260,
                                  minWidth: 260,
                                  maxHeight: 60,
                                  minHeight: 60,
                                  marginLeft: -7,
                                  marginTop: 10,
                                }}
                              >
                                <CardContent>
                                  <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 12,
          
                                      marginLeft: 50,
                                    }}
                                  >
                                    {item.data.name}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 11,
                                      color: "grey",
                                      marginLeft: 50,
                                    }}
                                  >
                                    {item.name}
                                    {item.name}
                                  </Typography>
          
                                  <Avatar
                                    style={{
                                      marginTop:-30,
                                      width: 48,
                                      height: 48,
                                      left: -5,
                                    }}
                                  />
                                  <IconButton
                                  style={{marginTop: "-150px",
                                    marginLeft: "190px"}}
                                    type="submit"
                                    // className={classes.iconButton}
                                    aria-label="search"
                                  >
                                    <CheckIcon color="primary" />
                                  </IconButton>
                                </CardContent>
                              </Card>
                            ))}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClosePopUp} color="primary">
                              ok
                            </Button>
                          </DialogActions>
                        </Dialog>
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
export default connect(mapStateToProps, null)(eventpage);