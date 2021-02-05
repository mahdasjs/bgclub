import React, { useState, useEffect } from "react";
import { makeStyles, useTheme , withStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios";
import Cookie from "js-cookie";
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {saveSelectValue} from './actions/index'
import Typography from '@material-ui/core/Typography';
import { Avatar } from 'material-ui';
import './responsive.css'
// class boardgames extends React.Component{
//     render(){
    const useStyles = makeStyles((theme) => ({

      }));
      
      export default function ProducerCom() {
        const classes = useStyles();
        const theme = useTheme();
        const token = Cookie.get("token");
        const userid = window.location.pathname.split('/')[2]
        const [users, setUsers] = useState([]);
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
                    console.log(res)
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
    
        return(
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
                        // style={{
                        //     justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                        //     display:'flex'
                        // ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 175}}
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
                           )
       
    }

