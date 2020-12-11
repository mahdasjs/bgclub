import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import Create from "./Createpost";
import CreateEvent from "../createEvent";
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
import { connect } from 'react-redux';
import Events from "../events";
import {postData,eventsData} from '../actions/index'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexGrow: 1,
  },
  paper: {
    width: theme.spacing(86.5),
    height: theme.spacing(22),
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
}));
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
function User({events,posts,dispatch}) {
  const classes = useStyles();
  const theme = useTheme();
    const [scroll, setScroll] = React.useState("paper");
    const [open, setOpen] = React.useState(false);
    const [openn, setOpenn] = React.useState(false);
    const [openEvent, setOpenEvent] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const userid = Cookie.get("userid");
    const [news, setNews] = useState([]);
    let [state, setState] = useState({
      username: null,
      firstname: null,
      id: null,
      userid: Cookie.get("userid"),
      imagee: null,
    });
    let [profilepic, setProfilepic] = useState({
      imagee: null,
      header:null,
    });
    const handleClickOpenn = () => {
    setOpenn(true);
   }
   const handleClickOpenEvent = () => {
    setOpenEvent(true);
   }
   const handleClosee = () => {
    dispatch(postData(window.location.pathname.split('/')[2]))
    setOpenn(false);
  };
  const handleCloseEvent = () => {
    dispatch(eventsData(window.location.pathname.split('/')[2]))
    setOpenEvent(false);
  };
    useEffect(() => {
        dispatch(postData(window.location.pathname.split('/')[2]))
        dispatch(eventsData(window.location.pathname.split('/')[2]))
        handleClickOpen();
    }, []);
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
      };
      const handleClose = () => {
        dispatch(postData(window.location.pathname.split('/')[2]))
        setOpen(false);
      };
      const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  useEffect(() => {
    handlePlayprofile();
  }, []);
  useEffect(() => {
    handleprofilepic();
  }, []);
  const handleprofilepic = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/profile/${userid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setProfilepic({
          imagee: res.data.profile_picture,
          header:res.data.profile_header_picture,
        });
      })
      .catch((error) => {});
  };
  const handlePlayprofile = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${window.location.pathname.split('/')[2]}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setState({
          header:res.data.header_picture,
          imagee: res.data.profile_picture,
          username: res.data.username,
          firstname: res.data.first_name,
        });
        setLoading(false);
        console.log(state.imagee);
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
   const boardgame=events.map(post => {
    return <Events
      id={post.id}
      data={post}
      />;
  })     
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
                          src={state.imagee}
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
                          @{state.username}
                          
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
                          
                          {state.firstname}
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
                          }}
                            />
                          </DialogContent>
                          {/* <DialogActions>
                            <Button onClick={handleClosee} color="primary">
                              save
                            </Button>
                          </DialogActions> */}
                        </Dialog>
                        <Dialog
                                  style={{zIndex:100000000}}
                          open={openEvent}
                          onClose={handleCloseEvent}
                          PaperComponent={PaperComponent}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" ,textAlign:"center"}}
                            id="draggable-dialog-title"
                          >
                            Hold an event
                          </DialogTitle>
                          <DialogContent>
                          <CreateEvent
                          onSuccessFullySave={() => {
                            handleCloseEvent();
                          }}
                            />
                          </DialogContent>
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
      <div className="Profilenews" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:700,paddingLeft:10 , width: '25%', height: '100%'}} >
      <h2 style={{fontFamily:'Open Sans' ,fontSize: 27, lineHeight: 0.1,marginLeft:5 }}>Events </h2>
      <Button
                        style={{marginTop:"-70px",marginLeft: "167px"}}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpenEvent}
        className={classes.eventButton}
      >
      create event
      </Button>
      <div style={{marginLeft:-40,marginTop:-20, height: '100%'}}>
        <FreeScrollBar>
        {boardgame}

        </FreeScrollBar>
    </div>                  
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap'}}>
                            {posts.map(post => {
      return <Post
        id={post.id}
        name={post.bg_name}
        data={post}
        />;
    })}
                        </div>
                        </Grid>
                        
 } 
       </div>
    );
 }
 function mapStateToProps  (state) {
  return {
    select: state.select,
    cartsssss:state.cartsssss,
    comments:state.comments,
    ratings:state.ratings,
    boardGames:state.boardGames,
    posts:state.posts,
    events:state.events
  }
}
export default connect(mapStateToProps)(User);
