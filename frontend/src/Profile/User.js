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
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";


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
export default function User() {
  const classes = useStyles();
  const theme = useTheme();
    const [scroll, setScroll] = React.useState("paper");
    
    const [open, setOpen] = React.useState(false);
    const [openn, setOpenn] = React.useState(false);
    const [opennn, setOpennn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const userid = Cookie.get("userid");
    const [news, setNews] = useState([]);
    const [post, setPost] = useState([]);
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
    const [uuuser, setUser] = useState({ user: "" });
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
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
    const handleChange2 = (event) => {
      let value = event.target.value;
      setUser({ user: value });
    };
    const handleClickOpenn = () => {
    setOpenn(true);
   }
   const handleClosee = () => {
    setOpenn(false);
  };
  const handleClickOpennn = () => {
    setOpennn(true);
   }
   const handleCloseee = () => {
    setOpennn(false);
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
        .get(`http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`, {
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
    handlePlayprofile();
  }, []);
  const handlePlayprofile = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setState({
          imagee: res.data.profile_picture,
          username: res.data.username,
          firstname: res.data.first_name,
        });
      })
      .catch((error) => {});
  };
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
          setpostLentgh(res.data.length);
        })
        .catch((error) => {});
    };
    const checkIsFollowingOrNot = (userId) => {
      return !!followin.filter((item) => item.id === userId).length;
    };
  
  
return (
    <div className="pro">
 <Grid
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
                            <Edit 
                             onSuccessFullySave={() => {
                              handleClose();
                              handlePlayprofile();
                              handleprofilepic();
                            }}
                             />
                          </DialogContent>
                        </Dialog>
                        <div>
                        
      </div>
      <div className="Profilenews" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:700,paddingLeft:10 , width: '23%', height: '100%'}} >

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
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={handleClickOpennn}
                              >
                                <SearchIcon />
                              </IconButton>
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
                                              left: 165,
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
                                                            `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
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
                                                            `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
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
                      <div>
                         
                        </div>
                        </Grid>
                        
    </div>
    );
 }