import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import { Grid, hexToRgb } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedData,addToCart,removeFromCart,addComment} from './actions/index'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import { IconButton} from '@material-ui/core';
import axios from 'axios'
class boardgames extends React.Component{
      constructor(){
        super()
        this.state={
          value:2,
          hover:-1,
          count:0,
          id:window.location.pathname.split('/')[2],
          comment:null
        }
      }
      handlechangeComment = (e) => {
        this.setState({ comment: e.target.value });
      };
      handlePostComment=(e)=>{
        if(this.state.comment!==null)
        {
          this.props.dispatch(addComment({data:{comment:this.state.comment,id:this.state.id}}))
          this.setState({comment:' '})
        const formData = new FormData();
        formData.append("post",this.state.id);
        formData.append("text",this.state.comment)
        axios({
          method: "put",
          url: "https://5faaa726b5c645001602af7e.mockapi.io/api/v1/new",
          headers: { 
            "Content-type": "multipart/form-data"},
            data:formData
          })
          .then((res)=>{
          })
          // .then((response) => {
          // this.setState({comment:' '})
          // axios({
          //   method: "get",
          //   url: `http://localhost:8000/api/v1/posts/comment/list/${this.props.postId}`,
          //   headers: {'Authorization':`Token ${Cookie.get('token')}`},
          // }).then((response) => {
          //     console.log(response.data)
          //       const length=response.data.length;
          //       const commentdata=response.data;
          //       const updatedcommentdata=commentdata.map(comment=>{
          //           return{
          //             ...comment,
          //           }
          //         })
          //     this.setState({comments:updatedcommentdata,commentArrayLength:length});
          //     console.log(response.data.length)
          //     if(response.data.length!==0){              
          //       console.log(this.state.comments[0].text)
          //     }
          //   })
            // })
          }
            else{
              alert("your comment can't be empty")
            }
      }
      async count(){
        const result = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).keys()];
        const values = [...this.props.cartsssss.reduce( (mp, o) => {
            if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
            mp.get(o.data.id).count++;
            return mp;
        }, new Map).values()];
        for(var i=0; i<result.length; i++){
            if(this.state.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:this.props.select}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
      this.count();
        this.props.dispatch(removeFromCart(this.state.id))
        this.setState({count:this.state.count-1})
      }
      componentDidMount(){
          this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
          this.count()

      }
    render(){
      console.log(this.props.comment)
        const selections = this.props.selections || []
        return(
            <div className='homepage'>
              <Grid container>
                        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={5}
                                            style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                  
                    <img
                    src={this.props.select.image}
                    style={{
                      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                      maxWidth:'100%',
                      height:'auto',
                      maxHeight:350          
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={12} lg={6}
                                                            style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left' ,marginTop:'30px',marginLeft:'30px'}} >

                  <Typography className='bgname'>
                {this.props.select.name}
                </Typography>
                <Typography className='bgprice'>
                {this.props.select.price}
                <div >
      <Rating
        name="hover-feedback"
        value={this.state.value}
        precision={0.5}
        onChange={(event, newValue) => {
          this.setState({value:newValue});
        }}

      />
       <div className='addAndRemove' style={{backgroundColor:'rgb(240, 248, 255)',borderRadius:100}} >
                        <IconButton aria-label="settings" style={{width:40,height:40,marginRight:0,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    {this.state.count}
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:0,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    </div>
      {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
    </div>
                </Typography>
                <Typography className='bgdescription'>
                {this.props.select.description}
                </Typography>
                                </Grid>
                                <Grid xs={12} sm={12} lg={5}
                                            style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                  
                  <Rating name="read-only" value={2} readOnly size="large"  />

                </Grid>
                <Grid style={{display:'flex',flexWrap:'nowrap', visibility:this.state.visibility,marginLeft:'30px' }}  container item xs={12} sm={12} lg={12} style={{marginBottom:100}}>

<Grid item xs={10} sm={10} lg={10} >
  <div style={{ display:'flex',flexWrap:'nowrap',width:'100%'}}>
    <TextareaAutosize value={this.state.comment} onChange={this.handlechangeComment} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Add comment..." 
    // style={{paddingTop:15, borderStyle:'hidden', outline:'none', fontSize:15, width:'110%'}}
    style={{borderStyle:'hidden',  outline:'none',backgroundColor:"rgb(245, 250, 252)", padding:10,  fontSize:15, width:'100%'}}

     />
  </div>
</Grid>
<Grid  item xs={2} sm={2} lg={2}>
<Button onClick={this.handlePostComment} 
style={{}}
 color="primary"
>
Send
</Button>
</Grid>
</Grid>
                                </Grid>

             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      select: state.select,
      cartsssss:state.cartsssss,
      comment:state.comment
    }
  }
export default connect(mapStateToProps, null)(boardgames);