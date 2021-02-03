import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import Create from "./Createpost";
import CreatePresell from "./presell";
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
import Mozayede from '../presellItem'
import { connect } from 'react-redux';
import Events from "../events";
import {postData,eventsData} from '../actions/index'
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { If } from "rc-if-else";
import HorizontalScroll from 'react-scroll-horizontal'

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
  button3: {
    
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(23),
      
    },
  },
  
  button1: {
    color: "grey",
    left: "280px",
    bottom: "31px",
    fontSize: 11,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(-0.5),
    },
  },
  button2: {
    color: "grey",
    left: "280px",
    bottom: "31px",
    fontSize: 11,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(9),
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
  iconButton: {
    marginLeft: 20,
  },
  input: {
    backgroundColor: "rgba(228, 233, 237, 0.5)",
    left: 85,
    
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function User({events,posts,dispatch}) {
  const classes = useStyles();
  const theme = useTheme();
    const [scroll, setScroll] = React.useState("paper");
    const [open, setOpen] = React.useState(false);
    const [openn, setOpenn] = React.useState(false);
    const [opennn, setOpennn] = React.useState(false);
    const [opennnn, setOpennnn] = React.useState(false);
    const [openEvent, setOpenEvent] = React.useState(false);
    const [openPresell, setOpenPresell] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const userid = window.location.pathname.split('/')[2];
    const [news, setNews] = useState([]);
    const [uuuser, setUser] = useState({ user: "" });
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
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
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followin, setFollowin] = useState([]);
    const [followerLentgh, setfollowerLentgh] = useState();
    const [followingLentgh, setfollowingLentgh] = useState();
    const [followCheck, setfollowCheck] = React.useState(false);
    const [postLentgh, setpostLentgh] = useState();
    let [follow, setFollow] = useState({
      id: null,
    });
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
    const handleChange2 = (event) => {
      let value = event.target.value;
      setUser({ user: value });
    };

    const handleClickOpenn = () => {
    setOpenn(true);
   }   
   const handleClickOpenEvent = () => {
    setOpenEvent(true);
   }
   const handleClickOpenPresell = () => {
    setOpenPresell(true);
   }

  const handleClosePresell = () => {
    dispatch(eventsData(window.location.pathname.split('/')[2]))
    setOpenPresell(false);
  };
   const handleClosee = () => {
    dispatch(postData(window.location.pathname.split('/')[2]))
    dispatch(eventsData(window.location.pathname.split('/')[2]))
    setOpenn(false);
  };
  const handleClickOpennn = () => {
    setOpennn(true);
   }
   const handleCloseee = () => {
    setOpennn(false);
  };
  const handleClickOpennnn = () => {
    setOpennnn(true);
   }
   const handleCloseeee = () => {
    setOpennnn(false);
  };
  const handleCloseEvent = () => {
    handleClickOpen();
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
        dispatch(eventsData(window.location.pathname.split('/')[2]))
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
    const getFollowers = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/followers/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          for(var i = 0; i<res.data.length; i++)
          if(res.data[i].username===Cookie.get('username'))
          {
            setfollowCheck(true)
            break
          }
          setfollowerLentgh(res.data.length);
          if (followers == [null]) {
            setFollowers([]);
          } else {
            setFollowers(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowers();
  }, []);
  useEffect(() => {
    const getFollowing = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/following/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setfollowingLentgh(res.data.length);
          if (following == [null]) {
            setFollowing([]);
          } else {
            setFollowing(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowing();
    const getFollowin = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/following/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
         
          setfollowingLentgh(res.data.length);
          if (followin == [null]) {
            setFollowin([]);
          } else {
            setFollowin(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowin();
  }, []);
  useEffect(() => {
    const userList = () => {
      axios
        .get("http://localhost:8000/api/v1/accounts/users/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          if (users == [null]) {
            setUsers([]);
          } else {
            setUsers(res.data);
            console.log(res.data)
          }
        })
        .catch((error) => {});
    };
    userList();
  }, []);
  const searchUsers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/v1/accounts/users/?search=${uuuser.user}`,
        {
          headers: {
            Authorization: `Token ${Cookie.get("token")}`,
          },
        }
      );
      if (search == [null]) {
        setSearch([]);
      } else {
        setSearch(result.data);
      }
    } catch (err) {}
  };useEffect(() => {
    searchUsers();
  }, [uuuser]);

  useEffect(() => {
    const userList = () => {
      axios
        .get("http://localhost:8000/api/v1/accounts/users/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          if (users == [null]) {
            setUsers([]);
          } else {
            setUsers(res.data);
            console.log(res.data)
          }
        })
        .catch((error) => {});
    };
    userList();
  }, []);
  useEffect(() => {
    handlePlayprofile();
  }, []);
  useEffect(() => {
    handlePlayprofile();
  }, []);
  useEffect(() => {
    handleprofilepic();
  }, []);
  const handlePlayprofile = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${window.location.pathname.split('/')[2]}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Cookie.get("token")}`,
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
          console.log(res.data)
          setpostLentgh(res.data.length);
        })
        .catch((error) => {});
    };
    const checkIsFollowingOrNot = (userId) => {
      return !!followin.filter((item) => item.id === userId).length;
    };
  
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
  const isFollowing = checkIsFollowingOrNot(userid);

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
                
                      <Paper elevation={3} style={{backgroundImage:` url(${profilepic.header})`,}}className={classes.paper}>
                        <Avatar
                          src={profilepic.imagee}
                          // style={{marginTop:-104,marginLeft:-34}}
                          className={classes.large}
                        ></Avatar>
                        </Paper>
                        <Paper elevation={2} className={classes.paper6}>
                        {Cookie.get('userid')===window.location.pathname.split('/')[2]?
                        <Button className={classes.button} size="small" startIcon={<SettingsIcon />} onClick={handleClickOpen('paper')}></Button>
                        :                        <Button className={classes.button} size="small" ></Button>
                      }
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
                        <Button size="small" 
                        onClick={handleClickOpennnn}
                        style={{fontFamily:'Open Sans'}}
                        className={classes.button1}>
                          Following
                          <br /> {followingLentgh}
                        </Button>
                        <Button size="small"
                        onClick={handleClickOpennnn}
                          style={{fontFamily:'Open Sans'}}
                         className={classes.button1}>
                          Followers <br />
                          {followerLentgh}
                        </Button>
                        <Dialog
                                  style={{zIndex:100000000}}
                          open={opennnn}
                          onClose={handleCloseee}
                          PaperComponent={PaperComponent}
                          aria-labelledby="draggable-dialog-title"
                        >
                         
                          <DialogContent>
                          <div >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="following" {...a11yProps(0)} />
          <Tab label="followers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        {followin.length === 0 && (
                             <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                               Nothing to Show Right Now!
                             </p>
                           )}
                           {followin.map((item) => {
                             const isFollowing = checkIsFollowingOrNot(item.id);
                             return (
                               <Card
                                 key={item.id}
                                 style={{
                                   backgroundColor: "white",
                                   width:'105%',
                                   maxHeight: 60,
                                   minHeight: 60,
                                   marginLeft: -7,
                                   marginTop: 3,
                                 }}
                               >
                                 <CardContent className={classes.card}>
                                   <Typography
                                     variant="body1"
                                     align="justify"
                                     style={{
                                       fontFamily: "Roboto",
                                       marginTop: -5,
                                       fontSize: 12,
                                       marginLeft: 50,
                                     }}
                                     onClick={() =>
                                       window.location.replace(`/user/${item.id}`)
                                     }
                                   >
                                     {item.username}
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
                                     {item.first_name}
                                     {item.last_name}
                                   </Typography>
         
                                   <Avatar
                                     src={item.profile_picture}
                                     style={{
                                       width: 48,
                                       height: 48,
                                       bottom: 38,
                                       left: -5,
                                     }}
                                   />
                                 <If condition={Cookie.get('username')!==item.username}>
                                   <Button
                                      style={{
                                        bottom: 80,
                                        left: 150,
                                        fontSize: 11,
                                      }}
                                      variant="contained"
                                      color="primary"
                                     size="small"
                                     className={classes.margin}
                                     onClick={
                                       isFollowing
                                         ? async () => {
                                             await axios
                                               .delete(
                                                 `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
         
                                                 {
                                                   headers: {
                                                    Authorization: `Token ${Cookie.get(
                                                      "token"
                                                    )}`,
                                                   },
                                                 }
                                               )
         
                                               .then((res) => {
                                                 axios
                                                   .get(
                                                     "http://localhost:8000/api/v1/accounts/users/",
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setUsers(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // const getFollowing = () => {
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setfollowingLentgh(res.data.length);
                                                     setFollowin(res.data);
                                                   });
                                                 // getFollowing();
                                                 // };
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setState({
                                                       followers: res.data.follower_num,
                                                       following: res.data.following_num,
                                                       imagee: res.data.profile_picture,
                                                       username: res.data.username,
                                                       firstname: res.data.first_name,
                                                     });
                                                   })
         
                                                   .catch((error) => {});
                                               })
         
                                               .catch((error) => {});
                                           }
                                         : async () => {
                                             await axios
                                               .patch(
                                                 `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                 follow.id,
                                                 {
                                                   headers: {
                                                    Authorization: `Token ${Cookie.get(
                                                      "token"
                                                    )}`,
                                                   },
                                                 }
                                               )
                                               .then((res) => {
                                                 axios
                                                   .get(
                                                     "http://localhost:8000/api/v1/accounts/users/",
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setUsers(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // const getFollowing = () => {
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setfollowingLentgh(res.data.length);
                                                     setFollowin(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // };
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setState({
                                                       followers: res.data.follower_num,
                                                       following: res.data.following_num,
                                                       imagee: res.data.profile_picture,
                                                       username: res.data.username,
                                                       firstname: res.data.first_name,
                                                     });
                                                   })
         
                                                   .catch((error) => {});
                                               })
                                               .catch((error) => {});
                                           }
                                     }
                                   >
                                      {isFollowing ? "unFollow" :"Follow"}
                                   </Button>
                                   </If>
                                 </CardContent>
                               </Card>
                             );
                           })}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
                            {followers.length === 0 && (
                              <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                                Nothing to Show Right Now!
                              </p>
                            )}
                            {followers.map((item) => {
                              const isFollowing = checkIsFollowingOrNot(item.id);
                              return (
                                <Card
                                  key={item.id}
                                  style={{
                                    backgroundColor: "white",
                                    width:'105%',
                                    maxHeight: 60,
                                    minHeight: 60,
                                    marginLeft: -7,
                                    marginTop: 3,
                                  }}
                                >
                                  <CardContent className={classes.card}>
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        fontFamily: "Roboto",
                                        marginTop: -5,
                                        fontSize: 12,
                                        marginLeft: 50,
                                      }}
                                      onClick={() =>
                                        window.location.replace(`/user/${item.id}`)
                                      }
                                    >
                                      {item.username}
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
                                      {item.first_name}
                                      {item.last_name}
                                    </Typography>
          
                                    <Avatar
                                      src={item.profile_picture}
                                      style={{
                                        width: 48,
                                        height: 48,
                                        bottom: 38,
                                        left: -5,
                                      }}
                                    />
                                  <If condition={Cookie.get('username')!==item.username}>
                                    <Button
                                      style={{
                                        bottom: 80,
                                        left: 150,
                                        fontSize: 11,
                                      }}
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      className={classes.margin}
                                      onClick={
                                        isFollowing
                                          ? async () => {
                                              await axios
                                                .delete(
                                                  `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
          
                                                  {
                                                    headers: {
                                                      Authorization: `Token ${Cookie.get(
                                                        "token"
                                                      )}`,
                                                    },
                                                  }
                                                )
          
                                                .then((res) => {
                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    });
                                                  // getFollowing();
                                                  // };
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
          
                                                .catch((error) => {});
                                            }
                                          : async () => {
                                              await axios
                                                .patch(
                                                  `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                  follow.id,
                                                  {
                                                    headers: {
                                                      Authorization: `Token ${Cookie.get(
                                                        "token"
                                                      )}`,
                                                    },
                                                  }
                                                )
                                                .then((res) => {
                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // };
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
                                                .catch((error) => {});
                                            }
                                      }
                                    >
                                       {isFollowing ? "unFollow" :"Follow"}
                                    </Button>
                                    </If>
                                  </CardContent>
                                </Card>
                              );
                            })}
        </TabPanel>
      </SwipeableViews>
    </div>
                          </DialogContent>
                           <DialogActions>
                            <Button onClick={handleCloseeee} color="primary">
                              ok
                            </Button>
                          </DialogActions> 
                        </Dialog>
          
                        <Button size="small" 
                         style={{fontFamily:'Open Sans'}}
                        className={classes.button2}>
                          Posts <br />
                          {postLentgh}
                        </Button>
                        {Cookie.get('userid')===window.location.pathname.split('/')[2]?
                        <Button
                        style={{marginTop:"-40px",marginLeft: "550px",bottom: "45px"}}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpenn}
        className={classes.button3}
      >
      create post
      </Button>
      :                                <Button
      style={{marginTop:"-40px",marginLeft: "550px",bottom: "45px",fontFamily:'Open Sans'}}
      className="req"
      variant="outlined"
      size="small"
      color="default"
      className={classes.button3}
      onClick={
        followCheck 
                      ? async () => {
                          await axios
                            .delete(
                              `http://localhost:8000/api/v1/accounts/users/unfollow/${userid}`,

                              {
                                headers: {
                                  Authorization: "Token " + Cookie.get('token'),
                                },
                              }
                            )

                            .then((res) => {
                              setfollowCheck(false)
                              axios
                                .get(
                                  "http://localhost:8000/api/v1/accounts/users/",
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setUsers(res.data);
                                })
                                .catch((error) => {});
                              // const getFollowing = () => {
                              axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setfollowingLentgh(res.data.length);
                                  setFollowin(res.data);
                                });
                                axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/followers/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setfollowerLentgh(res.data.length);
                                  setFollowers(res.data);
                                });
                              // getFollowing();
                              // };
                              axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setState({
                                    followers: res.data.follower_num,
                                    following: res.data.following_num,
                                    imagee: res.data.profile_picture,
                                    username: res.data.username,
                                    firstname: res.data.first_name,
                                  });
                                })

                                .catch((error) => {});
                            })

                            .catch((error) => {});
                        }
                      : async () => {
                          await axios
                            .patch(
                              `http://localhost:8000/api/v1/accounts/users/follow/${userid}`,
                              follow.id,
                              {
                                headers: {
                                  Authorization: "Token " + Cookie.get('token'),
                                },
                              }
                            )
                            .then((res) => {
                              setfollowCheck(true)

                              axios
                                .get(
                                  "http://localhost:8000/api/v1/accounts/users/",
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setUsers(res.data);
                                })
                                .catch((error) => {});
                              // const getFollowing = () => {
                              axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setfollowingLentgh(res.data.length);
                                  setFollowin(res.data);
                                })
                                .catch((error) => {});
                                axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/followers/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setfollowerLentgh(res.data.length);
                                  setFollowers(res.data);
                                });
                              // };
                              checkIsFollowingOrNot(userid)
                              axios
                                .get(
                                  `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                  {
                                    headers: {
                                      "Content-Type":
                                        "multipart/form-data",
                                      Authorization: `Token ${Cookie.get(
                                        "token"
                                      )}`,
                                    },
                                  }
                                )
                                .then((res) => {
                                  setState({
                                    followers: res.data.follower_num,
                                    following: res.data.following_num,
                                    imagee: res.data.profile_picture,
                                    username: res.data.username,
                                    firstname: res.data.first_name,
                                  });
                                })

                                .catch((error) => {});
                            })
                            .catch((error) => {});
                        }
                  }
                >
                   {followCheck ? "unFollow" :"Follow" }
                </Button>
}
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
                        <Dialog
                                  style={{zIndex:100000000}}
                          open={openPresell}
                          onClose={handleClosePresell}
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
                          <CreatePresell
                          onSuccessFullySave={() => {
                            handleClosePresell();
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
                          <Edit 
                             onSuccessFullySave={() => {
                              handleClose();
                              handlePlayprofile();
                              handleprofilepic();
                            }}/>
                          </DialogContent>
                        </Dialog>
                        <div>
                        
      </div>
      <div className="Profilenews" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:700,paddingLeft:10 , width: '25%', height: '70%',marginTop:60,marginBottom:100}} >
      <h2 style={{fontFamily:'Open Sans' ,fontSize: 27, lineHeight: 0.1,marginLeft:5 }}>Events </h2>
      {Cookie.get('userid')===window.location.pathname.split('/')[2]?
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
      :null}
      <div style={{marginLeft:-40,marginTop:-20, height: '100%'}}>
        <FreeScrollBar>
        {boardgame}

        </FreeScrollBar>
    </div>     
  
                              <Dialog
                                        style={{zIndex:100000000}}

                                open={opennn}
                                onClose={handleCloseee}
                                PaperComponent={PaperComponent}
                                aria-labelledby="draggable-dialog-title"
                              >
                                <DialogTitle
                                  style={{ cursor: "move" }}
                                  id="draggable-dialog-title"
                                >
                                  Search for {uuuser.user}
                                </DialogTitle>
                                <DialogContent>
                                  {search.length === 0 && (
                                    <p
                                      style={{
                                        textAlign: "center",
                                        fontFamily: "Roboto",
                                      }}
                                    >
                                      Nothing to Show !
                                    </p>
                                  )}
                                  {search.map((item) => {
                                     const isFollowing = checkIsFollowingOrNot(item.id);
                                    return (
                                      <Card
                                        key={item.id}
                                        style={{
                                          backgroundColor: "white",
                                          maxWidth: 260,
                                          minWidth: 260,
                                          maxHeight: 60,
                                          minHeight: 60,
                                          marginLeft: -7,
                                          marginTop: 3,
                                        }}
                                      >
                                        <CardContent className={classes.card}>
                                          <Typography
                                            variant="body1"
                                            align="justify"
                                            style={{
                                              fontFamily: "Roboto",
                                              marginTop: -5,
                                              fontSize: 12,
          
                                              marginLeft: 50,
                                            }}
                                            onClick={() =>
                                              window.location.replace(`/user/${item.id}`)
                                            }
                                          >
                                            {item.username}
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
                                            {item.first_name}
                                            {item.last_name}
                                          </Typography>
                                          <Avatar
                                            src={item.profile_picture}
                                            style={{
                                              width: 48,
                                              height: 48,
                                              bottom: 38,
                                              left: -5,
                                            }}
                                          />
                                          <Button
                                            style={{
                                              bottom: 80,
                                              left: 150,
                                              fontSize: 11,
                                            }}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.margin}
                                            onClick={
                                              isFollowing
                                                ? async () => {
                                                    await axios
                                                      .delete(
                                                        `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
          
                                                        {
                                                          headers: {
                                                            Authorization: `Token ${Cookie.get(
                                                              "token"
                                                            )}`,
                                                          },
                                                        }
                                                      )
          
                                                      .then((res) => {
                                                        axios
                                                          .get(
                                                            "http://localhost:8000/api/v1/accounts/users/",
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setUsers(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // const getFollowing = () => {
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setfollowingLentgh(
                                                              res.data.length
                                                            );
                                                            setFollowin(res.data);
                                                          });
                                                        // getFollowing();
                                                        // };
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setState({
                                                              followers:
                                                                res.data.follower_num,
                                                              following:
                                                                res.data.following_num,
                                                              imagee:
                                                                res.data.profile_picture,
                                                              username: res.data.username,
                                                              firstname:
                                                                res.data.first_name,
                                                            });
                                                          })
          
                                                          .catch((error) => {});
                                                      })
          
                                                      .catch((error) => {});
                                                  }
                                                : async () => {
                                                    await axios
                                                      .patch(
                                                        `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                        follow.id,
                                                        {
                                                          headers: {
                                                            Authorization: `Token ${Cookie.get(
                                                              "token"
                                                            )}`,
                                                          },
                                                        }
                                                      )
                                                      .then((res) => {
                                                        axios
                                                          .get(
                                                            "http://localhost:8000/api/v1/accounts/users/",
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setUsers(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // const getFollowing = () => {
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setfollowingLentgh(
                                                              res.data.length
                                                            );
                                                            setFollowin(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // };
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setState({
                                                              followers:
                                                                res.data.follower_num,
                                                              following:
                                                                res.data.following_num,
                                                              imagee:
                                                                res.data.profile_picture,
                                                              username: res.data.username,
                                                              firstname:
                                                                res.data.first_name,
                                                            });
                                                          })
          
                                                          .catch((error) => {});
                                                      })
                                                      .catch((error) => {});
                                                  }
                                            }
                                          >
                                            {isFollowing ? "unFollow" :"Follow"}
                                          </Button>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseee} color="primary">
                                    ok
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              <Divider
                                className={classes.divider}
                                orientation="vertical"
                              />             
                      </div>
                      
                      <div  style={{height:'350px',marginLeft:'20px',width:'75%'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>My presell </h2>
            {Cookie.get('userid')===window.location.pathname.split('/')[2]?
            <Button
                        style={{marginTop:"-80px",marginLeft: "550px"}}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpenPresell}
        className={classes.button3}
      >
      presell bg
      </Button>
      :null}
              <HorizontalScroll style={{marginTop:-30}} >
              {posts.map(post => {
      return <Mozayede
        id={post.id}
        name={post.bg_name}
        data={post}
        />;
    })}
              </HorizontalScroll>
            </div>
            <h2 style={{fontFamily:'Open Sans',marginLeft:20 ,fontSize: 30, lineHeight: 0.1 }}>My Boardgames </h2>

                      <div style={{display:'flex',flexWrap:'wrap'}}>
                            {posts.map(post => {
      return <Post
        id={post.id}
        name={post.bg_name}
        data={post}
        />;
    })}
                        </div>
                        <div className="Profilenews" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:700,paddingLeft:10 ,height:10}} >

<InputBase
  className={classes.input}
  placeholder="Search for users"
  style={{ fontSize: 13, marginLeft: "-10px" }}
  //inputProps={{ "aria-label": "Search for users" }}
  type="text"
  value={uuuser.user}
  onChange={(event) =>
    setUser({ user: event.target.value })
  }
/>
<IconButton
  type="submit"
  style={{marginLeft:50}}
  className={classes.iconButton}
  aria-label="search"
  onClick={handleClickOpennn}
>
  <SearchIcon />
</IconButton>

<Divider
  className={classes.divider}
  orientation="vertical"
/>

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
    events:state.events,
  }
}
export default connect(mapStateToProps)(User);