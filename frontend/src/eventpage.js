import React from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedEventData,addToCart,removeFromCart,addComment, addRating, commentData} from './actions/index'
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
import Cookie from 'js-cookie';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import {likeApi,createCommentApi,createLikeApi,delLikeApi} from './api/apis';
import Mapir from "mapir-react-component";
import { LooksOneOutlined } from '@material-ui/icons';

const Map = Mapir.setToken({
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkMjhhOGY5YzRlMzBlZmM3NTFhYjRkYWQ1Y2QyMDczNzllMTViM2ZjOTg3MzljYzIxNTYyYjYwNWRkMzc2YmFlZmIxNWZhY2ZlYjUyNmYwIn0.eyJhdWQiOiI2OTgwIiwianRpIjoiNWQyOGE4ZjljNGUzMGVmYzc1MWFiNGRhZDVjZDIwNzM3OWUxNWIzZmM5ODczOWNjMjE1NjJiNjA1ZGQzNzZiYWVmYjE1ZmFjZmViNTI2ZjAiLCJpYXQiOjE1NzU5NTYyNzUsIm5iZiI6MTU3NTk1NjI3NSwiZXhwIjoxNTc4NDYxODc1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.Fx_r1Rguxm3Gtp_RDGxSbjhm67w-f_tldO0AHAyr1-L9JkGKgnaVBNWv4_x1qdjk6I6biCXAKpB5jafrUsp8bRS11pz2Tg0G80vaGb891_XF97pT-WGVV3J_H447tiC5JHj7ZSRodOsiVc8EblsX2BmxgewKyHYqs-6YGHYrVro_-xzNRl8EoXzDZtV34HqUWA0IQ5nqhVW39eIWzu6dmySKfSFoLRcOL9-8qC8p2jk9_siki9k3RBt5NVJyl8rOPHASy6yuqABWyeZZV5N8qELqiipP-Ka_zjc0DgrxwSE1AdvxdNDhZO7x7v72X0eM3oWvFMpwGqI5pRzIOpASiw", //Mapir api key
        "Mapir-SDK": "reactjs"
      }
    };
  }
});
class eventpage extends React.Component{
      constructor(){
        super()
        this.state={
          value:0,
          count:0,
          id:window.location.pathname.split('/')[2],
          comment:null,
          visibility:'hidden',
          toggle:false,
          showAll:false,
          limitation:10,
          openMemberPopUp:false,
          name:'null',
          postId:null,
          commentArrayLength:null,
          comments:[],
          like:false,
          likeLength:0,
          likeId:null,
          anchorEl: null,
          openAdd:false,
          markerArray: [],
          lat: 35.72,
          lon: 51.42,
            join:true,
            userid:Cookie.get('userid'),
            parId:null,
            parLength:0
        }
        this.reverseFunction = this.reverseFunction.bind(this);
    }
    handleJoin = event => {
      this.setState({ join: !this.state.join });
      axios({
        method:'post',
        url: `http://localhost:8000/api/v1/events/${this.state.id}/participate/create/${this.state.userid}`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
    }).then(
      this.setState({parLength:this.state.parLength+1})
    )
    };
    handleLeave = event => {
      this.setState({ join: !this.state.join });
      axios({
        method:'delete',
        url: `http://localhost:8000/api/v1/events/${this.state.id}/participate/${this.state.parId}`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
    }).then(
      this.setState({parLength:this.state.parLength-1})
    )
    };
      handlechangeComment = (e) => {
        this.setState({ comment: e.target.value });
      };
      handlePostComment=(e)=>{
        if(this.state.comment!==null)
        {
        const formData = new FormData();
        formData.append("event",this.state.id);
        formData.append("text",this.state.comment)
        axios({
          method: "post",
          url:createCommentApi,
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
          }).then((response) => {
            this.props.dispatch( commentData(window.location.pathname.split('/')[2]))

          this.setState({comment:' '})
            })}
            else{
              alert("your comment can't be empty")
            }
        
      }
      handleLike= (event) => {
        this.setState({ like: event.target.checked });
        if(this.state.like===false)
          {const formData = new FormData();
          formData.append("event",this.state.id);
          axios({
            method: "post",
            url: createLikeApi,
            headers: { 
              "Content-type": "multipart/form-data",
              'Authorization':`Token ${Cookie.get('token')}`},
              data:formData
            }).then((response)=>{
              this.setState({likeId:response.data.id})
              axios({
                method: "get",
                url: likeApi+this.state.id,
                headers: {'Authorization':`Token ${Cookie.get('token')}`},
              }).then((response) => {
                  console.log(response.data)
                  const length=response.data.length;
             
                    this.setState({likeLength:length});
                    console.log(response.data.length)
      
                })
            })}
            else
          {const formData = new FormData();
          axios({
            method: "delete",
            url: delLikeApi+this.state.likeId,
            headers: { 
              "Content-type": "multipart/form-data",
              'Authorization':`Token ${Cookie.get('token')}`}
            }).then((response)=>{
              axios({
                method: "get",
                url: likeApi+this.state.id,
                headers: {'Authorization':`Token ${Cookie.get('token')}`},
              }).then((response) => {
                  console.log(response.data)
                  const length=response.data.length;
             
                    this.setState({likeLength:length});
                    console.log(response.data.length)
      
                })
            })}
      };
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
    reverseFunction(map, e) {

      var url = `https://map.ir/reverse/no?lat=${this.props.selectEvent.event_lon}&lon=${this.props.selectEvent.event_len}`
      fetch(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkMjhhOGY5YzRlMzBlZmM3NTFhYjRkYWQ1Y2QyMDczNzllMTViM2ZjOTg3MzljYzIxNTYyYjYwNWRkMzc2YmFlZmIxNWZhY2ZlYjUyNmYwIn0.eyJhdWQiOiI2OTgwIiwianRpIjoiNWQyOGE4ZjljNGUzMGVmYzc1MWFiNGRhZDVjZDIwNzM3OWUxNWIzZmM5ODczOWNjMjE1NjJiNjA1ZGQzNzZiYWVmYjE1ZmFjZmViNTI2ZjAiLCJpYXQiOjE1NzU5NTYyNzUsIm5iZiI6MTU3NTk1NjI3NSwiZXhwIjoxNTc4NDYxODc1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.Fx_r1Rguxm3Gtp_RDGxSbjhm67w-f_tldO0AHAyr1-L9JkGKgnaVBNWv4_x1qdjk6I6biCXAKpB5jafrUsp8bRS11pz2Tg0G80vaGb891_XF97pT-WGVV3J_H447tiC5JHj7ZSRodOsiVc8EblsX2BmxgewKyHYqs-6YGHYrVro_-xzNRl8EoXzDZtV34HqUWA0IQ5nqhVW39eIWzu6dmySKfSFoLRcOL9-8qC8p2jk9_siki9k3RBt5NVJyl8rOPHASy6yuqABWyeZZV5N8qELqiipP-Ka_zjc0DgrxwSE1AdvxdNDhZO7x7v72X0eM3oWvFMpwGqI5pRzIOpASiw'
  
          }
        })
        .then(response => response.json())
        .then(data => { console.log(data) })
  
      const array = [];
      array.push(<Mapir.Marker
        coordinates={[this.props.selectEvent.event_lon, this.props.selectEvent.event_len]}
        anchor="bottom">
      </Mapir.Marker>);
      this.setState({ markerArray: array });
    }
   componentDidMount() {
    this.props.dispatch( selectedEventData(window.location.pathname.split('/')[2]))
    this.props.dispatch( commentData(window.location.pathname.split('/')[2]))
        axios({
          method: "get",
          url: likeApi+this.state.id,
          headers: {'Authorization':`Token ${Cookie.get('token')}`},
        }).then((response) => {
          for(var i = 0; i<response.data.length; i++)
            if(Cookie.get('username')===response.data[i].user.username)
            {
              this.setState({likeId:response.data[i].id})
              this.setState({like:true})
              break
            }

            // formData.append(`hashtags[${i}]name`,this.state.playlistTag[i])
            console.log(response.data)
            const length=response.data.length;
       
              this.setState({likeLength:length});
              console.log(response.data.length)
              
          })
          axios({
            method:'get',
            url: `http://localhost:8000/api/v1/events/${this.state.id}/participate`,
            headers: { 'Authorization':`Token ${Cookie.get('token')}`},
        }).then((response) => {
          for(var i = 0; i<response.data.length; i++)
            if(Cookie.get('username')===response.data[i].user.username)
            {
              this.setState({parId:response.data[i].id})
              this.setState({join:false})
              break
            }
            const length=response.data.length;
            this.setState({parLength:length});
            // const length=response.data.length;
       
            //   this.setState({likeLength:length});
            //   console.log(response.data.length)
              
          })
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
            <div className='eventpage'>
              <Grid container>
                <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
                </Grid>
                <Grid xs={12} sm={12} lg={5}
                  style={{backgroundColor:'#fff' ,marginTop:'30px',marginLeft:30}} >            
                    <img
                    src={this.props.selectEvent.event_pic}
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
                      {this.props.selectEvent.title}
                    </Typography>
                    <Typography >
                        by mohadese
                    </Typography>
                     <Typography className='bgdescription'>
                        {this.props.selectEvent.description}
                      </Typography>
                      <Mapir
                center={[51.4, 35.7]}
                Map={Map}
                onClick={this.reverseFunction}
                containerStyle={        {  height: '40vh',
                width: '33vw'}}
                >
                {this.state.markerArray}
              </Mapir>
                  </Grid>
                  <Grid xs={12} sm={12} lg={1}
                  style={{backgroundColor:'#fff' ,marginTop:'30px',marginLeft:30}} >    
                  <FormControlLabel
                    // style={{marginRight:'70%'}}
                    label={this.state.likeLength}
                      control={
                        <Checkbox  
                        checked={this.state.like} 
                        onChange={this.handleLike}    
                       icon={<FavoriteBorder style={{fontSize:30}} />} 
                       checkedIcon={<Favorite style={{fontSize:30}}/>}
                      name="checkedH" />}
                   />
                   </Grid>
                  <Grid xs={12} sm={12} lg={12} style={{display:'flex',flexWrap:'nowrap',marginLeft:30,marginTop:20}}>
                          <Grid  lg={6} style={{display:'flex',flexWrap:'nowrap'}} >
                      <Typography className='bgdescription' style={{marginTop:15}}>
                        memebers         
                      </Typography>
                      <Avatar style={{marginLeft:10,width:55,height:55}}></Avatar>
                      {this.state.parLength>1?
                      <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                      :null
                      }
                      {this.state.parLength>2?
                      <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                    :null}
                    {this.state.parLength>3?
                    <Avatar style={{marginLeft:-15,border:'2px solid #fff',width:55,height:55}}></Avatar>
                    :null
                    }
                      <Typography className='bgdescription' style={{marginTop:15}} onClick={this.handleClickMembers}>
                         show all         
                      </Typography>
                      </Grid>
                      <Grid  lg={6}  style={{display:'flex',flexWrap:'nowrap'}} >

                      <div className='raisedTag' style={{borderRadius:5,marginLeft:232,width:90,height:40,marginTop:13}}>
                      <Typography style={{marginTop:10,fontSize:15,marginLeft:10}}>
                        only {this.props.selectEvent.number-this.state.parLength} left      
                      </Typography>
                      </div>
                      <div>
                      {this.state.join?
  <Button
  onClick={this.handleJoin}
  style={{marginTop:15,marginLeft:20,minWidth:90,height:40,background:'rgba(0, 255, 128, 0.459)'}}
  variant="contained"
  size="small"
>
    join
</Button>
    :  <Button
    onClick={this.handleLeave}
    style={{marginTop:15,marginLeft:20,minWidth:90,height:40,background:' rgba(255, 0, 0, 0.459)'}}
    variant="contained"
    size="small"
  >
      leave
  </Button>
  }
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
                    {comments}
                </Grid>
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
                                style={{backgroundColor: "white",
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      select: state.select,
      cartsssss:state.cartsssss,
      ratings:state.ratings,
      selectEvent:state.selectEvent,
      comments:state.comments
    }
  }
export default connect(mapStateToProps, null)(eventpage);