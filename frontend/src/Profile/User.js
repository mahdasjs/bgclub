import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import Create from "./Createpost";
import "./Profile.css";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import LinesEllipsis from 'react-lines-ellipsis';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme , withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Cookie from "js-cookie";
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import FreeScrollBar from 'react-free-scrollbar';
import News from '../news'
import Post from '../Post'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useDispatch, useSelector } from "react-redux"
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from '../actions/index'
import CartBorder from '@material-ui/icons/AddShoppingCart';
import Cart from '@material-ui/icons/RemoveShoppingCart';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { PostAddRounded } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "rgba(228, 233, 237, 0.4)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexGrow: 1,
     //display: "flex",
    // flexDirection: "row-reverse",
  },
  paper: {
    width: theme.spacing(86.5),
    height: theme.spacing(22),
  
    // backgroundColor: "rgba( 255,255,255, 0.1)",
    backgroundColor: "rgba(191, 191, 191, 0.5)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      height: theme.spacing(12),

    },
  },
  paper6: {
    width: theme.spacing(86.5),
    height: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      height: theme.spacing(10),

    },
  },
  button: {
    color: "grey",
    marginLeft: "-10px",
    
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(0.5),
      top:-25
    },
  },
  button1: {
    
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(23),
      
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    top: theme.spacing(13),
    left: theme.spacing(4.3),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      top: theme.spacing(7),
    },
  },
  input: {
    backgroundColor: "rgba(228, 233, 237, 0.5)",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
export default function User() {
  const classes = useStyles();
  const theme = useTheme();
    const [scroll, setScroll] = React.useState("paper");
    const [open, setOpen] = React.useState(false);
    const [openn, setOpenn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const userid = Cookie.get("userid");
    const [news, setNews] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [post, setPost] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch(); 
    let [profile, setProfile] = useState({
      username: null,
      firstname: null,
      id: null,
      userid: Cookie.get("userid"),
      imagee: null,
      header:null,
    });
    let [state, setState] = useState({
           checkCart:false,
            counter:[],
            count:0,
            rate:0,
    });
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseee = () => {
      setAnchorEl(null);
    };
    const handleClickOpenn = () => {
    setOpenn(true);
   }
   const handleClosee = () => {
    setOpenn(false);
  };
    useEffect(() => {
        handleClickOpen();
    }, []);
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const descriptionElementRef = React.useRef(null);
      async function count(){
        const result = [...props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).keys()];
        const values = [...props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).values()];
        for(var i=0; i<result.length; i++){
            if(props.id==result[i]){
                await setState({count:values[i].count})
            }
        }
        var value=0
        var counter=0
        const ratingValues = [...props.ratings.values()];
        for(var i=0; i<ratingValues.length; i++){
          if(ratingValues[i].data.id===props.id){
            counter++
            value=value+parseFloat (ratingValues[i].data.rate)
          }
        }
        await setState({rate:value/counter})
    }
     const handleAdd=(e)=>{
        count();
        dispatch(addToCart({data:props.data}))
       setState({count:state.count+1})
    }
    const handleRemove=(e)=>{
        count();
        dispatch(removeFromCart(props.id))
        setState({count:state.count-1})

    }
  useEffect(() => {
    handlePlayprofile();
  }, []);
  const handlePlayprofile = () => {
    axios
      .get(`https://5fac415503a60500167e7b7f.mockapi.io/api/v1/profile/1`, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setProfile({
          header:res.data.header_picture,
          imagee: res.data.profile_picture,
          username: res.data.username,
          firstname: res.data.first_name,
        });
        setLoading(false);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    handlePosts();
  }, []);
  const handlePosts = () => {
      axios
        .get(`http://localhost:8000/api/v1/posts/profile/list/${userid}`, {
          headers: {
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`
          },
        })
        .then((res) => {
          setPost(res.data);
          console.log(res.data)
        })
        .catch((error) => {});
    };
  useEffect(() => {
    handleNews();
  }, []);
  const handleNews = () => {
    axios({
      method: "get",
      url: `https://5faaa726b5c645001602af7e.mockapi.io/api/v1/News`,
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Token ${Cookie.get("token")}`,
      },
    }).then((res) => {
      setNews(res.data);
      setLoading(false);
    });
  };
   
return (
    <div className="pro">

        {loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',

                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div> 
                :  <Grid
                container
                
              >
                
                      <Paper elevation={3} style={{backgroundImage:` url(${state.header})`,}}className={classes.paper}>
                        <Avatar
                          src={profile.imagee}
                          // style={{marginTop:-104,marginLeft:-34}}
                          className={classes.large}
                        ></Avatar>
                        </Paper>
                        <Paper elevation={2} className={classes.paper6}>
                        <Button className={classes.button} size="small" startIcon={<SettingsIcon />} onClick={handleClickOpen('paper')}></Button>
                        <Typography
                          variant="body1"
                          align="justify"
                          style={{
                            textAlign: "left",
                            marginLeft:"160px",
                            fontFamily: "Roboto",
                            marginTop: "-27px",
                            fontSize: 17,
                            color: "grey",
                          }}
                        >
                          @{profile.username}
                          
                        </Typography>
                        <Typography
                          variant="body1"
                          align="justify"
                          style={{
                            textAlign: "left",
                            marginLeft:"190px",
                            marginTop: "-10px",
                            fontFamily: "Roboto",
                            fontSize: 15,
                            color: "grey",
                          }}
                        >
                          
                          {profile.firstname}
                        </Typography>
                        <Button
                        style={{marginTop:"-40px",marginLeft: "550px"}}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpenn}
        className={classes.button1}
      >
      create post
      </Button>
      <Dialog
                                  style={{zIndex:100000000}}
                          open={openn}
                          onClose={handleClosee}
                          PaperComponent={PaperComponent}
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
                            handleClosee();
                            handlePosts();
                          }}
                            />
                          </DialogContent>
                          {/* <DialogActions>
                            <Button onClick={handleClosee} color="primary">
                              save
                            </Button>
                          </DialogActions> */}
                        </Dialog>
          
                        </Paper>
                       
                  <Dialog
                         style={{marginBottom:5}}
                          open={open}
                          onClose={handleClose}
                          scroll={scroll}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description"
                        >
                          <DialogTitle id="scroll-dialog-title">Edit Profile</DialogTitle>
                          <DialogContent dividers={scroll === "paper"}>
                            <Edit />
                          </DialogContent>
                        </Dialog>
                        <div>
                        
      </div>
      <div className="Profilenews" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:700,paddingLeft:10 , width: '23%', height: '100%'}} >
      <h2 style={{fontFamily:'Open Sans' ,fontSize: 27, lineHeight: 0.1 }}>News </h2>
                         
                        {news
                          .map((item) => (
                            <News
                              title={item.title}
                              image={item.image}
                              
                            />
                          ))
                          }
                          
                      </div>
                      <div><div className="post" style={{ maxWidth: 500,
      marginLeft:156,
      marginTop:20,}}>
      {post.map((item) => (
      <Card  key={item.id} className={classes.root}>

        <CardHeader
          avatar={
            <Avatar  src={profile.imagee} aria-label="recipe" className={classes.avatar}>
             
            </Avatar>
          }
          action={
            <IconButton aria-label="settings"  onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
         
          title={profile.username}
          subheader={profile.firstname}
        />
        {/* <CardMedia
          className={classes.media}
          image={item.post_pic}
          title="Paella dish"
        /> */}
        <CardContent>
                    <img
                    className={classes.media}
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href=`/bgpage/${item.id}`;
                                }}
                        src={item.post_pic}
                        style={{
                          // display:'block',
                          // margin:'0 auto',
                          // maxWidth:'100%',
                          // height:'auto',
                          // maxHeight:220
                      }} 
                        // style={{marginTop:-13,
                        // maxHeight: 230, maxWidth: 300, minWidth: 300, minHeight: 230}}
                        />  
                                          <Typography className='name' style={{}}>

                        {item.bg_name}
                        </Typography>
                        <br/>
          {/* <LinesEllipsis style={{
                                      marginTop: -6,
                                      fontSize: 12,
                                      }}
                                      text={item.description}
                                maxLine='4'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                              
          /> */}
          
        </CardContent>
        <CardActions disableSpacing>
        <div style={{marginTop:10,marginLeft:10}}>
                        <Rating  precision={0.1} name="read-only" value={state.rate} readOnly size="small"  />
                        </div>
                        <div className='addAndRemove' style={{borderRadius:100}} >
                          {state.count!=0?
                        <IconButton aria-label="settings" style={{width:35,height:35,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    :   <IconButton aria-label="settings" disabled  style={{backgroundColor:' rgba(0, 0, 0, 0.1)', width:35,height:35,marginLeft:5,marginRight:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}} onClick={handleRemove} >
                    <Minus  style={{color:"#000"}}/>
        </IconButton>
    }
                    {state.count}
                    {state.count<item.number?
                        <IconButton aria-label="settings" style={{width:35,height:35,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    :
                    <IconButton aria-label="settings" disabled style={{backgroundColor:' rgba(0, 0, 0, 0.1)',width:35,height:35,marginLeft:5,border:'2px solid  #999',WebkitBoxShadow:' 3px 3px 10px rgba(0,0,0,0.4)',MozBoxShadow:'5px 5px 15px rgba(0,0,0,0.4)'}}      onClick={handleAdd}    >
                    <Plus  style={{color:"#000"}}/>
        </IconButton>
    }
                    </div>
          <div style={{fontSize:13,color:"grey",marginLeft:170}}>
     sell : {item.sell_price}
    <br/>
      rent : {item.rent_price}
    </div>
        </CardActions>
           </Card>
         
     ))}
     <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseee}
          >
            <StyledMenuItem>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
      </StyledMenu>
   </div>
                        </div>
                        </Grid>
                        
  }
       </div>
)
}
const mapStateToProps = (state) => {
  return {
      select: state.select,
      cartsssss:state.cartsssss,
      ratings:state.ratings
  }
}
export default connect(mapStateToProps, null)(User);