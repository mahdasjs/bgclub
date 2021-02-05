import React, { useState, useEffect } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import Cookie from "js-cookie";
import headerImage from './back.jpg';
import Typography from '@material-ui/core/Typography';
import { Avatar } from 'material-ui';
import ProducerCom from "./producerCom";
import Grid from "@material-ui/core/Grid";
import './responsive.css'
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import Draggable from "react-draggable";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userList } from "./api";

const useStyles = makeStyles((theme) => ({
 
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
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
export default function Producers() {
  const classes = useStyles();
  const theme = useTheme();
  const token = Cookie.get("token");
  const userid = window.location.pathname.split('/')[2]
  const [uuuser, setUser] = useState({ user: "" });
  const [search, setSearch] = useState([]);
  const [users, setUsers] = useState([]);
  const [openn, setOpenn] = React.useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followin, setFollowin] = useState([]);
  const [followerLentgh, setfollowerLentgh] = useState();
  const [followingLentgh, setfollowingLentgh] = useState();
  const [loading, setLoading] = React.useState(true);
  let [state, setState] = useState({
    username: null,
    firstname: null,
    followers: null,
    following: null,
    followin:null,
    id: null,
    userid: Cookie.get("userid"),
  });
  let [follow, setFollow] = useState({
    id: null,
  });
  const handleClickOpenn = () => {
    setOpenn(true);
  };
  const handleClosee = () => {
    setOpenn(false);
  };
        useEffect(() => {
            userList ()
                .then((res) => {
                    console.log(res)
                  if (users == [null]) {
                    setUsers([]);
                    setLoading(false);
                  } else {
                    setUsers(res.data);
                    setLoading(false);
                    console.log(res.data)
                  }
                })
                .catch((error) => {});
            
            userList();
          }, []);

          useEffect(() => {
            searchUsers();
          }, [uuuser]);
        

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
  };
  const checkIsFollowingOrNot = (userId) => {
    return !!followin.filter((item) => item.id === userId).length;
  };

  const renderTitle = (item) => {
    if(!item.songs.length){
      return;
    }
    return <div className="story">{item.title}</div>
  }
  
  return (
    <div>
       {loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',

                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                         </div>
      : <Grid container >
        <Grid xs={12} sm={12} lg={12} style={{ height: '60px' }}>
        </Grid>
        <Grid xs={12} sm={12} lg={3}>
        </Grid>
        <Grid xs={12} sm={12} lg={9}>
          <div className='Lists'>
            <h2 style={{ fontFamily: 'Open Sans', fontSize: 30, lineHeight: 0.1 }}>List of producers </h2>
            <div style={{ marginTop:"-50px", marginLeft:"650px"}}>
            <InputBase
                                className={classes.input}
                                placeholder="Search for producers"
                                style={{ fontSize: 13, marginLeft: "-10px" }}
                                //inputProps={{ "aria-label": "Search for producers" }}
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
                                onClick={handleClickOpenn}
                              >
                                <SearchIcon />
                              </IconButton>
                              <Dialog
                                        style={{zIndex:100000000}}

                                open={openn}
                                onClose={handleClosee}
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
                                    const isPrivate = item.profile_status==="private";
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
                                           <Avatar
                                            src={item.profile_picture}
                                            style={{
                                              width: 48,
                                              height: 48,
                                              marginTop:"-9px",
                                              marginLeft: "-5px",
                                            }}
                                          />
          
                                          <Typography
                                            variant="body1"
                                            align="justify"
                                            style={{
                                              fontFamily: "Roboto",
                                              marginTop: -5,
                                              fontSize: 12,
                                              marginTop: "-46px",
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
                                         
                                          <Button
                                            style={{
                                              bottom: 30,
                                              left: 155,
                                              fontSize: 11,
                                            }}
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className={classes.margin}
                                            onClick={
                                              isFollowing
                                                ? async () => {
                                                    await axios
                                                      .delete(
                                                        `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
          
                                                        {
                                                          headers: {
                                                            Authorization:
                                                              "Token " + token,
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
                                                            Authorization:
                                                              "Token " + token,
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
                                            {isFollowing ? "unFollow" : isPrivate ? "Request" :"Follow"}
                                          </Button>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClosee} color="primary">
                                    ok
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ProducerCom />
            </div>
          </div>
        </Grid>
      </Grid>
}
    </div>
  )
}

