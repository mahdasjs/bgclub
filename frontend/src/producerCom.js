import React, { useState, useEffect } from "react";
import { makeStyles, useTheme , withStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Cookie from "js-cookie";
import Typography from '@material-ui/core/Typography';
import { Avatar } from 'material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import './responsive.css'
import { userList } from "./api";

    const useStyles = makeStyles((theme) => ({

      }));
      
      export default function ProducerCom() {
        const classes = useStyles();
        const theme = useTheme();
        const token = Cookie.get("token");
        const userid = window.location.pathname.split('/')[2]
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = React.useState(true);
        useEffect(() => {
          userList ()
              .then((res) => {
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

        return(
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
: 
            <div style={{display: 'flex', flexWrap: 'wrap' }}>
                {users.length === 0 && (
                                    <p
                                      style={{
                                        textAlign: "center",
                                        fontFamily: "Roboto",
                                      }}
                                    >
                                      Nothing to Show !
                                    </p>
                                  )}
                                  {users.map((item) => {
                            
                                    return (
                <Card key={item.id} 
                    style={{marginTop:15, width:200,maxHeight:200, marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                        image={item.header_picture}
                        component="img"
                        height="100"                      
                        />
                        <Avatar alt="Remy Sharp" className='avatar' style={{ border: '5px solid white'}}
                        src={item.profile_picture}
                        >
                        </Avatar>
                                          <Typography style={{justifyContent:'center',alignItems:'center',textAlign:'center'}}>

                        {item.username}
                        </Typography>
                    </CardContent>
                </Card>
                 );
                }
                 )}
             </div>
      }</div>
                           )
       
    }

