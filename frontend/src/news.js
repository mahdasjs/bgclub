import React,{Component} from 'react';
import image from './back.jpg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class news extends Component{
    render(){
        return(
            <div style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}}>
                      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
                <CardMedia
                    image={this.props.image}
                    style={{marginRight:20, maxHeight: 60, maxWidth: 60, minWidth: 60, minHeight: 60}}/>   
                  <Typography className='title'>
                    {this.props.title.substring(0,50)}
                    </Typography>
                </CardContent> 
         </div>
        )
    }
}
export default news
