import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {addPostToCart, selectedData,removePostFromCart,postData} from './actions/index'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Cookie from 'js-cookie';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import Create from "./editPost";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton,Box, Grid } from '@material-ui/core';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            count:0,
            rate:0,
            anchorEl: null,
            openAdd:false,
            value:'sell',
            openEdit:false,
            id: "",
            bg_name: "",
            price: '',
            description:"",
            post_pic: '',
            number:'',
            value:'sell'
        }
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
        for(var i=0; i<result.length; i++){
            if(this.props.id==result[i]){
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
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    handelDelPost=()=>{
      axios({
        method:'delete',
        url: `http://localhost:8000/api/v1/posts/profile/${this.props.id}`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
    }).then( ()=>this.props.dispatch(postData(window.location.pathname.split('/')[2]))
    )
      this.handleClose()
    }
    componentDidMount(){
      axios
      .get(`http://localhost:8000/api/v1/posts/profile/${this.props.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + Cookies.get('token'),
        },
      })
      .then((res) => {
        console.log(res)
        if(res.data.sell_price==""){
          this.setState({
            price: res.data.rent_price,
            value:'rent'
          });
        }
        else{
          this.setState({
            price: res.data.sell_price,
          });
        }
        this.setState({
          id:res.data.id,
          bg_name: res.data.bg_name,
          description: res.data.description,
          post_pic: res.data.post_pic,
          number: res.data.number,
        
        });
      })
      .catch((error) => {});

      console.log(this.props.ratings)
        this.count()
    }
    handelEditPost=()=>{
      this.handleClose()
      console.log(this.state.bg_name)
      this.setState({openEdit:true})
    }
    handleClosee = () => {
      axios
      .get(`http://localhost:8000/api/v1/posts/profile/${this.props.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + Cookies.get('token'),
        },
      })
      .then((res) => {
        console.log(res)
        if(res.data.sell_price==""){
          this.setState({
            price: res.data.rent_price,
            value:'rent'
          });
        }
        else{
          this.setState({
            price: res.data.sell_price,
          });
        }
        this.setState({
          id:res.data.id,
          bg_name: res.data.bg_name,
          description: res.data.description,
          post_pic: res.data.post_pic,
          number: res.data.number,
        
        });
      })
      .catch((error) => {});

      this.props.dispatch(postData(window.location.pathname.split('/')[2]))
      this.setState({openEdit:false})
    };
    
    render(){
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
  
        return(
            <div style={{marginLeft:45}}>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:280,minWidth:280,maxHeight:400,minHeight:400}}>
                              <CardHeader
          avatar={
            <Avatar  src={this.props.data.user.profile_picture} aria-label="recipe" style={{marginLeft:10}} >
             
            </Avatar>
          }
          action={
            <div> 
              {Cookie.get('userid')===window.location.pathname.split('/')[2]?

            <IconButton aria-label="settings"  onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
            :null}
             <Menu
                                           anchorEl={anchorEl}
                                           open={open}
                                           onClose={this.handleClose}
                                         >
                                           <MenuItem onClick={this.handelDelPost}>Delete</MenuItem>
                                           <MenuItem onClick={this.handelEditPost}>Edit</MenuItem>
                                         </Menu>
                                         </div>
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
                                window.location.href='/postpage/' + this.props.id;
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
                        {Cookie.get('userid')===window.location.pathname.split('/')[2]?

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
                    :null}
                    </CardContent> 
                </Card>
                <Dialog
                                  style={{zIndex:100000000}}
                          open={this.state.openEdit}
                          onClose={this.handleClosee}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" ,textAlign:"center"}}
                            id="draggable-dialog-title"
                          >
                            Sell / Rent your boardgame !
                          </DialogTitle>
                          <DialogContent>
                          <Create
                          onSuccessFullySave={() => {
                            this.handleClosee();
                          }}
                          id={this.state.id}
                          bg_name={this.state.bg_name}
                          description={this.state.description}
                          price={this.state.price}
                          postpic={this.state.post_pic}
                          number={this.state.number}
                          value={this.state.value}
                            />
                          </DialogContent>
                          {/* <DialogActions>
                            <Button onClick={handleClosee} color="primary">
                              save
                            </Button>
                          </DialogActions> */}
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
        posts:state.posts,
        cartPost:state.cartPost
    }
  }
  export default connect(mapStateToProps, null)(boardgames);