import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from './actions/index'
import Typography from '@material-ui/core/Typography';
import CartBorder from '@material-ui/icons/AddShoppingCart';
import Cart from '@material-ui/icons/RemoveShoppingCart';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCart from '@material-ui/icons/AddShoppingCart'
import RemoveCart from '@material-ui/icons/RemoveShoppingCart'
import { IconButton,Box,Grid } from '@material-ui/core';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
class boardgames extends React.Component{
    constructor(){
        super()
        this.state={
            checkCart:false,
            counter:[],
            count:0,
            rate:0,
            openReqPopUp:false
        }
    }
    async count(){
        const result = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.bgid) ) mp.set(o.data.bgid, { ...o, count: 0 });
            mp.get(o.data.bgid).count++;
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.bgid)) mp.set(o.data.bgid, { ...o, count: 0 });
            if(Cookies.get('username')==o.data.username)
            {
                mp.get(o.data.bgid).count++;
            }
            return mp;
        }, new Map).values()];
        for(var i=0; i<result.length; i++){
            if(this.props.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
        var value=0
        var counter=0
        const ratingValues = [...this.props.ratings.values()];
        for(var i=0; i<ratingValues.length; i++){
          if(ratingValues[i].data.id===this.props.id){
            counter++
            value=value+parseFloat (ratingValues[i].data.rate)
          }
        }
        await this.setState({rate:value/counter})
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:{description:this.props.data.description,bgid:this.props.data.id,postid:-1,
        image:this.props.data.image,name:this.props.data.name,sell_price:this.props.data.price,
        rent_price:this.props.data.price,number:0,username:Cookies.get('username')}}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removeFromCart(this.props.id))
        this.setState({count:this.state.count-1})
    }
    handleCloseReqPopUp=()=>{
        this.setState({openReqPopUp: !this.state.openReqPopUp})
      }
    componentDidMount(){
        console.log(this.props.cartsssss)
        this.count()
    }
    
    render(){
        return(
            <div>
                <Card       
                    onClick={()=>this.props.dispatch(selectedData(this.props.id))}  
                    style={{marginTop:15, maxWidth:223,minWidth:223,maxHeight:270,minHeight:270,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        image={this.props.data.post_pic}
                        style={{
                            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                            display:'flex'
                        ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 165}}/>  
                                          <Typography className='name'>

                        {this.props.name.substring(0,15)}
                        </Typography>
                        {window.location.pathname.split('/')[2]==Cookies.get('userid')?(
                            <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={this.handleCloseReqPopUp}
                            >
                              requests
                          </Button>
                        ):(
                            <Button
                            variant="contained"
                            size="small"
                            color="primary">
                              starting price : {this.props.data.sell_price}$
                          </Button>
                        )

                        }
                       
                    </CardContent> 
                </Card>
                <Dialog
                          style={{zIndex:100000000}}
                          open={this.state.openReqPopUp}
                          onClose={this.handleCloseReqPopUp}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" }}
                            id="draggable-dialog-title"
                          >
                            Requests
                          </DialogTitle>
                          <DialogContent>
                            {this.props.ratings.map((item) => (
                              <Card
                                key={item.id}
                                style={{backgroundColor: "white",
                                  maxWidth: 260,
                                  minWidth: 260,
                                  maxHeight: 60,
                                  minHeight: 60,
                                  marginLeft: -7,
                                  marginTop: 10,
                                }}
                              >
                                <CardContent>
                                  <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 12,
                                      marginLeft: 50,
                                    }}
                                  >
                                    {item.data.name}
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
                                    {item.name}
                                    {item.name}
                                  </Typography>
          
                                  <Avatar
                                    style={{
                                      width: 48,
                                      height: 48,
                                      left: -5,
                                    }}
                                  />
                                  <IconButton
                                  style={{marginTop: "-150px",
                                    marginLeft: "190px"}}
                                    type="submit"
                                    // className={classes.iconButton}
                                    aria-label="search"
                                  >
                                    <CheckIcon color="primary" />
                                  </IconButton>
                                </CardContent>
                              </Card>
                            ))}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClosePopUp} color="primary">
                              ok
                            </Button>
                          </DialogActions>
                        </Dialog>
             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        select: state.select,
        cartsssss:state.cartsssss,
        ratings:state.ratings
    }
  }
  export default connect(mapStateToProps, null)(boardgames);
