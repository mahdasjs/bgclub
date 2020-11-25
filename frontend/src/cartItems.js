import React,{Component} from 'react';
import image from './back.jpg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import { IconButton,Box } from '@material-ui/core';
import { connect } from 'react-redux';
import {addToCart, removeFromCart, saveSelectValue, selectedData,counterPlus} from './actions/index'
class news extends Component{
    constructor(){
        super()
        this.state={
            counter:[],
            count:0,
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
            if(this.props.id==result[i]){
                await this.setState({count:values[i].count})
            }
        }
    }
    handleAdd=(e)=>{
        this.count();
        this.props.dispatch(addToCart({data:this.props.data}))
        this.setState({count:this.state.count+1})
    }
    handleRemove=(e)=>{
        this.count();
        this.props.dispatch(removeFromCart(this.props.id))
        this.setState({count:this.state.count-1})

    }

    render(){
        return(
            <div style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `,border:'1px solid rgba(0, 0, 0, 0.1) ',marginTop:5}}>
                      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
                <CardMedia
                    image={this.props.data.image}
                    style={{marginRight:20, maxHeight: 60, maxWidth: 60, minWidth: 60, minHeight: 60}}/>   
                  <Typography className='titleCart'>
                    {this.props.name}
                    </Typography>
                    <Typography className='priceCart'>
                    {this.props.data.price}
                    </Typography>
                    <div className="addAndRemoveFromCart" style={{backgroundColor:'rgb(240, 248, 255)',borderRadius:100}} >
                        <IconButton aria-label="settings" style={{width:40,height:40,marginRight:5,borderRight:'2px solid'}} onClick={this.handleRemove} >
                                <Minus  style={{color:"#000"}}/>
                    </IconButton>
                    {this.props.count}
                        <IconButton aria-label="settings" style={{width:40,height:40,marginLeft:5,borderLeft:'2px solid'}}      onClick={this.handleAdd}    >
                                <Plus  style={{color:"#000"}}/>
                    </IconButton>
                    </div>
                </CardContent> 
               
         </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        News: state.News,
        cartsssss:state.cartsssss
    };
  };
export default connect(mapStateToProps, null)(news);
