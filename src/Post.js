import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import axios from "axios";
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginLeft:20,
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
  
  export default function Post() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [post, setPost] = useState([]);
    let [state, setState] = useState({
      username: null,
      imagee: null,
    });
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
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
          setState({
            imagee: res.data.profile_picture,
            username: res.data.username,
          });

        })
        .catch((error) => {});
    };
    useEffect(() => {
      handlePlaypost();
    }, []);
    const handlePlaypost = () => {
      axios
        .get(`https://5fac415503a60500167e7b7f.mockapi.io/api/v1/post`, {
          headers: {
            
              "Content-Type": "application/json",
            // Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setPost(res.data);
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
            <IconButton aria-label="settings">
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
                                      text={item}
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
    
        </CardActions>
           </Card>
         
     ))}
   </div>
    );
  }