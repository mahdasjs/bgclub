import React, { useState, useEffect } from "react";
import Edit from "./Edit";
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
export default function User() {
  const classes = useStyles();
  const theme = useTheme();
    const [scroll, setScroll] = React.useState("paper");
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    let [state, setState] = useState({
      username: null,
      firstname: null,
      id: null,
      userid: Cookie.get("userid"),
      imagee: null,
      header:null,
    });
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
                :  <Grid container >
                
                      <Paper elevation={3
                      } style={{backgroundImage:` url(${state.header})`,}}className={classes.paper}>
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
                        <Button
                        style={{marginTop:"200px",marginLeft: "-410px"}}
        variant="contained"
        size="small"
        color="primary"
        className={classes.button1}
        startIcon={<ShoppingCartIcon />}
      >
       ShoppingCart
      </Button>
      </div>
                        </Grid>
 } 
       </div>
    );
 }
