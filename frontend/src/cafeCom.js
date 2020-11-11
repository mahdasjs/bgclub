import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {saveSelectValue} from './actions/index'
import Typography from '@material-ui/core/Typography';
import { Avatar } from 'material-ui';
import './responsive.css'
class boardgames extends React.Component{
    render(){
        return(
            <div>
                <Card            
                    style={{marginTop:15, maxWidth:280,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                        image={headerImage}
                        component="img"
                        alt="Contemplative Reptile"
                        height="100"
                        title="Contemplative Reptile"
                        // style={{
                        //     justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                        //     display:'flex'
                        // ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 175}}
                        /> 
                        <Avatar alt="Remy Sharp" className='avatar' style={{ border: '5px solid white'}}
                        src={headerImage}
                        > 
                        </Avatar> 
                                          <Typography className='name'>

                        hi
                        </Typography>
                    </CardContent> 
                </Card>
             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      selections: state.selections,
    }
  }
export default connect(mapStateToProps, null)(boardgames);