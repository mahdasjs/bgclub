import React, { useState, useEffect } from "react";
import { makeStyles , withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import axios from "axios";
import LinesEllipsis from 'react-lines-ellipsis';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Cookie from "js-cookie";
// import { handlePosts } from "./api";
import { handlePlayprofile } from "./api";
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      marginLeft:156,
      marginTop:20,
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
  export default function Post() {
    const classes = useStyles();
    const token = Cookie.get("token");
    const userid = Cookie.get("userid");
    const [expanded, setExpanded] = React.useState(false);
    const [post, setPost] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [state, setState] = useState({
      username: null,
      imagee: null,
    });
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
      handlePlayprofile();
    }, []);
     handlePlayprofile() 
        .then((res) => {
          setState({
            imagee: res.data.profile_picture,
            username: res.data.username,
          });

        })
        .catch((error) => {});
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
    return (
    <div className="post">
      {post.map((item) => (
      <Card  key={item.id} className={classes.root}>

        <CardHeader
          avatar={
            <Avatar  src={state.imagee} aria-label="recipe" className={classes.avatar}>
             
            </Avatar>
          }
          action={
            <IconButton aria-label="settings"  onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
         
          title={state.username}
          subheader={item.bg_name}
        />
        <CardMedia
          className={classes.media}
          image={item.post_pic}
          title="Paella dish"
        />
        <CardContent>
          <LinesEllipsis style={{
                                      marginTop: -6,
                                      fontSize: 12,
                                      }}
                                      text={item.description}
                                maxLine='4'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                              
          />
          
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <CommentIcon />
          </IconButton>
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
            onClose={handleClose}
          >
            <StyledMenuItem>
          <ListItemText primary="buy" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="rent" />
        </StyledMenuItem>
      </StyledMenu>
   </div>
    );
  }