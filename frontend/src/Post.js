// import React, { useState, useEffect } from "react";
// import { makeStyles , withStyles} from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentIcon from '@material-ui/icons/Comment';
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import axios from "axios";
// import LinesEllipsis from 'react-lines-ellipsis';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import { handlePosts } from "./api";
// import { handlePlayprofile } from "./api";
// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 500,
//       marginLeft:156,
//       marginTop:20,
//     },
//     media: {
//       height: 0,
//       paddingTop: '56.25%', // 16:9
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//   }));
//   const StyledMenu = withStyles({
//     paper: {
//       border: '1px solid #d3d4d5',
//     },
//   })((props) => (
//     <Menu
//       elevation={0}
//       getContentAnchorEl={null}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'center',
//       }}
//       {...props}
//     />
//   ));
  
//   const StyledMenuItem = withStyles((theme) => ({
//     root: {
//       '&:focus': {
//         backgroundColor: theme.palette.primary.main,
//         '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//           color: theme.palette.common.white,
//         },
//       },
//     },
//   }))(MenuItem);
//   export default function Post() {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
//     const [post, setPost] = useState([]);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     let [state, setState] = useState({
//       username: null,
//       imagee: null,
//     });
//     const handleExpandClick = () => {
//       setExpanded(!expanded);
//     };
//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
  
//     const handleClose = () => {
//       setAnchorEl(null);
//     };
//     useEffect(() => {
//       handlePlayprofile();
//     }, []);
//      handlePlayprofile() 
//         .then((res) => {
//           setState({
//             imagee: res.data.profile_picture,
//             username: res.data.username,
//           });

//         })
//         .catch((error) => {});
//     useEffect(() => {
//       handlePosts();
//     }, []);

//     handlePosts()
//         .then((res) => {
//           setPost(res.data);
//         })
//         .catch((error) => {});
//     return (
//     <div className="post">
//       {post.map((item) => (
//       <Card  key={item.id} className={classes.root}>

//         <CardHeader
//           avatar={
//             <Avatar  src={state.imagee} aria-label="recipe" className={classes.avatar}>
             
//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings"  onClick={handleClick}>
//               <MoreVertIcon />
//             </IconButton>
//           }
         
//           title={state.username}
//           // subheader={item.bg_name}
//         />
//         <CardMedia
//           className={classes.media}
//           image={item.post_pic}
//           title="Paella dish"
//         />
//         <CardContent>
//           <LinesEllipsis style={{
//                                       marginTop: -6,
//                                       fontSize: 12,
//                                       }}
//                                       text={item.description}
//                                 maxLine='4'
//                                 ellipsis='...'
//                                 trimRight
//                                 basedOn='letters'
                              
//           />
          
//         </CardContent>
//           {/* <div style={{fontSize:13,color:"grey"}}>
//      sell : {item.sell_price}
//     <br/>
//       rent : {item.rent_price}
//     </div> */}
//            </Card>
         
//      ))}
//      <StyledMenu
//             id="customized-menu"
//             anchorEl={anchorEl}
//             keepMounted
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <StyledMenuItem>
//           <ListItemText primary="buy" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           <ListItemText primary="rent" />
//         </StyledMenuItem>
//       </StyledMenu>
//    </div>
//     );
//   }
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
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cookies from 'js-cookie'
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
          title={Cookies.get('username')}
        />
                    <CardContent style={{marginTop:-20}}>
                    <img
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        src={this.props.data.image}
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
                                          <Typography className='name' style={{marginLeft:12}}>

                        {this.props.name.substring(0,25)}
                        </Typography>
                        <div style={{marginTop:10,marginLeft:10}}>
                        <Rating  precision={0.1} name="read-only" value={this.state.rate} readOnly size="small"  />
                        </div>
                        <div className='addAndRemove' style={{borderRadius:100}} >
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
        ratings:state.ratings
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
